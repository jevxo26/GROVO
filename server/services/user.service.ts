import bcrypt from "bcryptjs";
import status from "http-status";
import customError from "../error/customError";
import { prisma } from "../lib/prisma";
import { tokenUtils } from "../utils/token";

// Create a new user along with userProfile, userSecurity, and userNotificationSetting
const createUser = async (payload: any) => {
  const { email, password, dateOfBirth, ...usersData } = payload;

  // Validate required fields
  if (!email || !password) {
    throw new customError(status.BAD_REQUEST, "Email and password required");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new customError(status.CONFLICT, "Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user and related records in transaction
  const newUser = await prisma.$transaction(async (tx) => {
    // Create user with all data
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        // Handle dateOfBirth if provided
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        // Spread the rest of the data
        ...usersData,
      },
    });

    // Create related records
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
    ]);

    return user;
  });

  // Generate tokens
  const accessToken = tokenUtils.getAccessToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;

  return {
    user: userWithoutPassword,
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

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: { security: true },
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

  // Generate tokens
  const accessToken = tokenUtils.getAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = tokenUtils.getRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  // Update in transaction
  await prisma.$transaction([
    // Update user
    prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    }),
    // Reset security
    prisma.userSecurity.update({
      where: { userId: user.id },
      data: { failedLoginAttempts: 0, accountLocked: false },
    }),
    // Create login history
    prisma.userLoginHistory.create({
      data: {
        userId: user.id,
        status: "SUCCESS",
        ipAddress: ipAddress || null,
        deviceId: deviceId || null,
      },
    }),
    // Create or update device
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
    // Create session
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

  return { user: userWithoutPassword, accessToken, refreshToken };
};

// Retrieve User Profile using include and excluding password
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
    },
  });

  if (!user) {
    throw new customError(status.NOT_FOUND, "User profile not found");
  }

  return user;
};

export const userServices = {
  createUser,
  login,
  getUserProfile,
};
