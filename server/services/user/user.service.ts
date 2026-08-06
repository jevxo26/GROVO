import bcrypt from "bcryptjs";
import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

// Create a new user along with userProfile, userSecurity, userNotificationSetting, RoleAssignment, and Membership
const createUser = async (payload: any) => {
  const { email, password, dateOfBirth, role, firstName, lastName, phone, ...usersData } = payload;

  if (!email || !password) {
    throw new customError(status.BAD_REQUEST, "Email and password required");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new customError(status.CONFLICT, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const targetRole = role || "GENERAL_MEMBER";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Member";

  // Create user and related records in transaction
  const newUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        fullName,
        phone,
        isVerified: false,
        status: "PENDING",
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        ...usersData,
      },
    });

    // 1. Find or create target Role in Role table
    let roleRecord = await tx.role.findUnique({
      where: { roleName: targetRole },
    });

    if (!roleRecord) {
      roleRecord = await tx.role.create({
        data: {
          roleName: targetRole,
          displayName: targetRole.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase()),
          description: `Default role for ${targetRole}`,
        },
      });
    }

    // 2. Assign user role in UserRoleAssignment join table
    await tx.userRoleAssignment.create({
      data: {
        userId: user.id,
        roleId: roleRecord.id,
      },
    });

    // 3. Create Membership record
    await tx.membership.create({
      data: {
        userId: user.id,
        membershipNumber: `ASH-${Date.now().toString().slice(-6)}`,
        membershipType: targetRole as any,
        joiningDate: new Date(),
        status: "PENDING",
      },
    });

    // 4. Create related profile, security, notification, and OTP records
    await Promise.all([
      tx.userProfile.create({
        data: {
          userId: user.id,
        },
      }),
      tx.userSecurity.create({
        data: {
          userId: user.id,
        },
      }),
      tx.userNotificationSetting.create({
        data: {
          userId: user.id,
        },
      }),
      tx.userOTP.create({
        data: {
          userId: user.id,
          phone: phone || null,
          otp: "123456", // Default OTP for development verification
          purpose: "REGISTRATION",
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
          status: "PENDING",
        },
      }),
    ]);

    return user;
  });

  // Generate tokens with resolved role
  const accessToken = tokenUtils.getAccessToken({
    id: newUser.id,
    email: newUser.email,
    role: targetRole,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    id: newUser.id,
    email: newUser.email,
    role: targetRole,
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;

  return {
    user: {
      ...userWithoutPassword,
      role: targetRole,
    },
    accessToken,
    refreshToken,
  };
};

// Verify Registration OTP
const verifyOtp = async (payload: { email: string; otp: string }) => {
  const { email, otp } = payload;

  if (!email || !otp) {
    throw new customError(status.BAD_REQUEST, "Email and OTP code required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      roleAssignments: {
        include: { role: true },
      },
      membership: true,
    },
  });

  if (!user) {
    throw new customError(status.NOT_FOUND, "User not found");
  }

  // Find OTP record
  const otpRecord = await prisma.userOTP.findFirst({
    where: {
      userId: user.id,
      otp,
      purpose: "REGISTRATION",
    },
    orderBy: { createdAt: "desc" },
  });

  // Validate OTP (or fallback to default 123456 for easy dev testing)
  if (!otpRecord && otp !== "123456") {
    throw new customError(status.BAD_REQUEST, "Invalid OTP code");
  }

  // Mark user as verified and active
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      status: "ACTIVE",
    },
  });

  if (otpRecord) {
    await prisma.userOTP.update({
      where: { id: otpRecord.id },
      data: { status: "VERIFIED", verifiedAt: new Date() },
    });
  }

  const activeRole = user.roleAssignments?.[0]?.role?.roleName || user.membership?.[0]?.membershipType || "GENERAL_MEMBER";

  const accessToken = tokenUtils.getAccessToken({
    id: user.id,
    email: user.email,
    role: activeRole,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    id: user.id,
    email: user.email,
    role: activeRole,
  });

  const { password: _, ...userWithoutPassword } = updatedUser;

  return {
    user: {
      ...userWithoutPassword,
      role: activeRole,
    },
    accessToken,
    refreshToken,
  };
};

// Login user, verify password with bcryptjs, generate JWT token, and record device/login audit logs
const login = async (payload: any) => {
  const { email, password, ipAddress, deviceId, deviceName } = payload;

  if (!email || !password) {
    throw new customError(status.BAD_REQUEST, "Email and password required");
  }

  // Find user with role assignments and membership relations
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      security: true,
      roleAssignments: {
        include: { role: true },
      },
      membership: true,
    },
  });

  if (!user || !user.password) {
    throw new customError(status.UNAUTHORIZED, "Invalid email or password");
  }

  // Check if account is locked
  if (user.security?.accountLocked) {
    throw new customError(
      status.FORBIDDEN,
      "Account is locked. Please contact support.",
    );
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    await prisma.userSecurity.update({
      where: { userId: user.id },
      data: {
        failedLoginAttempts: { increment: 1 },
        accountLocked: (user.security?.failedLoginAttempts || 0) + 1 >= 5,
      },
    });
    throw new customError(status.UNAUTHORIZED, "Invalid email or password");
  }

  // Resolve active primary role from relational UserRoleAssignment or Membership
  const activeRole = user.roleAssignments?.[0]?.role?.roleName || user.membership?.[0]?.membershipType || "GENERAL_MEMBER";

  // Generate tokens with resolved role
  const accessToken = tokenUtils.getAccessToken({
    id: user.id,
    email: user.email,
    role: activeRole,
  });
  const refreshToken = tokenUtils.getRefreshToken({
    id: user.id,
    email: user.email,
    role: activeRole,
  });

  // Update in transaction
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    }),
    prisma.userSecurity.update({
      where: { userId: user.id },
      data: { failedLoginAttempts: 0, accountLocked: false },
    }),
    prisma.userLoginHistory.create({
      data: {
        userId: user.id,
        status: "SUCCESS",
        ipAddress: ipAddress || null,
        deviceId: deviceId || null,
      },
    }),
    ...(deviceId
      ? [
          prisma.userDevice.upsert({
            where: { deviceId },
            update: {
              lastLogin: new Date(),
              ipAddress: ipAddress || undefined,
              deviceName: deviceName || undefined,
            },
            create: {
              userId: user.id,
              deviceId,
              deviceName: deviceName || "Unknown Device",
              ipAddress: ipAddress || null,
              lastLogin: new Date(),
            },
          }),
        ]
      : []),
    prisma.userSession.create({
      data: {
        userId: user.id,
        deviceId: deviceId || null,
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "ACTIVE",
      },
    }),
  ]);

  // Remove password
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: {
      ...userWithoutPassword,
      role: activeRole,
    },
    accessToken,
    refreshToken,
  };
};

// Retrieve User Profile using relations (excluding password)
const getUserProfile = async (userId: string) => {
  if (!userId) {
    throw new customError(status.BAD_REQUEST, "User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userProfile: true,
      notificationSetting: true,
      security: {
        select: {
          twoFactorEnabled: true,
          failedLoginAttempts: true,
          accountLocked: true,
          lastPasswordChanged: true,
        },
      },
      addresses: true,
      membership: true,
      roleAssignments: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    throw new customError(status.NOT_FOUND, "User profile not found");
  }

  const activeRole = user.roleAssignments?.[0]?.role?.roleName || user.membership?.[0]?.membershipType || "GENERAL_MEMBER";
  const { password: _, ...userWithoutPassword } = user;

  return {
    ...userWithoutPassword,
    role: activeRole,
  };
};

const updateUserInfo = async (payload: any, userId: string) => {
  if (!userId) {
    throw new Error("User Id is required!");
  }
  const result = await prisma.userProfile.update({
    where: { userId },
    data: payload,
  });
  return result;
};

const updateUserNotificationSetting = async (payload: any, userId: string) => {
  if (!userId) {
    throw new customError(status.BAD_REQUEST, "User ID is required!");
  }
  const result = await prisma.userNotificationSetting.update({
    where: { userId },
    data: payload,
  });
  return result;
};

const updateUserSecurity = async (payload: any, userId: string) => {
  if (!userId) {
    throw new customError(status.BAD_REQUEST, "User ID is required!");
  }
  const result = await prisma.userSecurity.update({
    where: { userId },
    data: payload,
  });
  return result;
};

export const userServices = {
  createUser,
  verifyOtp,
  login,
  getUserProfile,
  updateUserInfo,
  updateUserNotificationSetting,
  updateUserSecurity,
};
