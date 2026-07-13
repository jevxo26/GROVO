import { prisma } from "../lib/prisma";

const registerUser = async (payload: any) => {
  return await prisma.$transaction(async (tx: any) => {
    // Create base user
    const user = await tx.user.create({
      data: {
        id: `usr-${Date.now()}`,
        name: `${payload.firstName} ${payload.lastName}`,
        email: payload.email,
        role: "USER",
      },
    });

    // Create profile
    await tx.userProfile.create({
      data: {
        userId: user.id,
      },
    });

    // Create notification settings
    await tx.userNotificationSetting.create({
      data: {
        userId: user.id,
      },
    });

    // Create security config
    await tx.userSecurity.create({
      data: {
        userId: user.id,
      },
    });

    // Log address if provided
    if (payload.address) {
      await tx.userAddress.create({
        data: {
          userId: user.id,
          countryId: "BD",
          divisionId: payload.address.divisionId?.toString(),
          districtId: payload.address.districtId?.toString(),
          upazilaId: payload.address.upazilaId?.toString(),
          unionId: payload.address.unionId?.toString(),
          village: payload.address.village,
          addressLine: payload.address.addressLine,
        },
      });
    }

    // Create a mock membership application
    const membershipNumber = `ASH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const membership = await tx.membership.create({
      data: {
        userId: user.id,
        membershipNumber,
        membershipType: "volunteer",
        status: "PENDING",
      },
    });

    // Generate mock OTP
    const otp = "123456";
    await tx.userOTP.create({
      data: {
        userId: user.id,
        phone: payload.phone || "00000000000",
        otp,
        purpose: "REGISTRATION",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
      },
    });

    return { user, membership, otp };
  });
};

const verifyOtp = async (payload: { email: string; otp: string }) => {
  const user = await prisma.user.findFirst({
    where: { email: payload.email },
    include: { otps: true },
  });

  if (!user) throw new Error("USER_NOT_FOUND");

  const matchingOtp = user.otps.find((o) => o.otp === payload.otp && o.expiresAt > new Date());
  if (!matchingOtp) throw new Error("INVALID_OR_EXPIRED_OTP");

  await prisma.$transaction(async (tx: any) => {
    await tx.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    await tx.userOTP.update({
      where: { id: matchingOtp.id },
      data: { verifiedAt: new Date(), status: "VERIFIED" },
    });
  });

  return { verified: true };
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findFirst({
    where: { email: payload.email },
    include: { userRoles: true },
  });

  if (!user) throw new Error("INVALID_CREDENTIALS");

  // Since password hashing is simulated, we'll auto-succeed for mock purposes
  return {
    user,
    token: "mock-session-jwt-token",
  };
};

const getMe = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userProfile: true,
      addresses: true,
      membership: {
        include: {
          cards: {
            include: {
              qrCodes: true,
            },
          },
        },
      },
    },
  });
};

const updateMe = async (userId: string, payload: any) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name: payload.name,
      image: payload.image,
      userProfile: {
        update: {
          fatherName: payload.fatherName,
          motherName: payload.motherName,
          occupation: payload.occupation,
          organization: payload.organization,
          designation: payload.designation,
          education: payload.education,
          bio: payload.bio,
          facebook: payload.facebook,
          linkedin: payload.linkedin,
          website: payload.website,
        },
      },
    },
  });
};

const approveMembership = async (membershipId: string, approvedBy: string) => {
  return await prisma.$transaction(async (tx: any) => {
    const membership = await tx.membership.update({
      where: { id: membershipId },
      data: {
        status: "ACTIVE",
        approvedBy,
        approvedAt: new Date(),
      },
    });

    const cardNumber = `CARD-${Date.now()}`;
    const card = await tx.membershipCard.create({
      data: {
        membershipId: membership.id,
        cardNumber,
        cardType: "DIGITAL",
        cardStatus: "ACTIVE",
      },
    });

    await tx.membershipQRCode.create({
      data: {
        membershipCardId: card.id,
        qrCode: `VERIFY-MEMBER-${membership.membershipNumber}`,
        verificationUrl: `https://ashray.org/verify/member/${membership.membershipNumber}`,
      },
    });

    await tx.membershipActivity.create({
      data: {
        membershipId: membership.id,
        activityType: "MEMBERSHIP_APPROVED",
        description: "Membership application approved by admin.",
        performedBy: approvedBy,
      },
    });

    return membership;
  });
};

const rejectMembership = async (membershipId: string, rejectedBy: string, remarks: string) => {
  return await prisma.$transaction(async (tx: any) => {
    const membership = await tx.membership.update({
      where: { id: membershipId },
      data: {
        status: "REJECTED",
      },
    });

    await tx.membershipActivity.create({
      data: {
        membershipId: membership.id,
        activityType: "MEMBERSHIP_REJECTED",
        description: `Rejected: ${remarks}`,
        performedBy: rejectedBy,
      },
    });

    return membership;
  });
};

const verifyQrCode = async (qrCodeVal: string, verifiedBy: string) => {
  const qrRecord = await prisma.membershipQRCode.findFirst({
    where: { qrCode: qrCodeVal },
    include: {
      membershipCard: {
        include: {
          membership: true,
        },
      },
    },
  });

  if (!qrRecord) throw new Error("INVALID_QR_CODE");

  const membership = qrRecord.membershipCard.membership;

  await prisma.$transaction(async (tx: any) => {
    await tx.membershipQRCode.update({
      where: { id: qrRecord.id },
      data: {
        scanCount: { increment: 1 },
        lastScannedAt: new Date(),
      },
    });

    await tx.membershipVerification.create({
      data: {
        membershipId: membership.id,
        verificationMethod: "QR_SCAN",
        verifiedBy,
        verificationStatus: "VERIFIED",
      },
    });
  });

  return membership;
};

const renewMembership = async (membershipId: string, payload: { amount: number; processedBy: string }) => {
  return await prisma.$transaction(async (tx: any) => {
    const nextExpiry = new Date();
    nextExpiry.setFullYear(nextExpiry.getFullYear() + 1); // 1 year renewal

    const renewal = await tx.membershipRenewal.create({
      data: {
        membershipId,
        renewalAmount: payload.amount,
        paymentStatus: "PAID",
        nextExpiryDate: nextExpiry,
        processedBy: payload.processedBy,
      },
    });

    await tx.membership.update({
      where: { id: membershipId },
      data: {
        status: "ACTIVE",
        expiryDate: nextExpiry,
      },
    });

    await tx.membershipActivity.create({
      data: {
        membershipId,
        activityType: "MEMBERSHIP_RENEWED",
        description: `Membership renewed. Next expiry: ${nextExpiry.toDateString()}`,
        performedBy: payload.processedBy,
      },
    });

    return renewal;
  });
};

const getMembershipActivities = async (membershipId: string) => {
  return await prisma.membershipActivity.findMany({
    where: { membershipId },
    orderBy: { createdAt: "desc" },
  });
};

export const userService = {
  registerUser,
  verifyOtp,
  loginUser,
  getMe,
  updateMe,
  approveMembership,
  rejectMembership,
  verifyQrCode,
  renewMembership,
  getMembershipActivities,
};
