import status from "http-status";
import { CardStatus, CardType, MembershipActivityType, MembershipStatus, MembershipType, PaymentStatus, VerificationMethod, VerificationStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const applyMembership = async (
  userId: string,
  payload: {
    membershipType?: MembershipType;
    organizationRole?: string;
    monthlyContribution?: number;
  }
) => {
  if (!userId) {
    throw new customError(status.BAD_REQUEST, "User ID is required.");
  }

  // Check if user already has an active or pending membership
  const existingMembership = await prisma.membership.findFirst({
    where: {
      userId,
      status: {
        in: [MembershipStatus.PENDING, MembershipStatus.ACTIVE, MembershipStatus.APPROVED],
      },
    },
  });

  if (existingMembership) {
    throw new customError(
      status.CONFLICT,
      "User already has a pending or active membership."
    );
  }

  // Generate unique membership number: MEM-YYYY-XXXXX
  let membershipNumber = "";
  let isUnique = false;
  while (!isUnique) {
    const currentYear = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    membershipNumber = `MEM-${currentYear}-${randomDigits}`;

    const existing = await prisma.membership.findUnique({
      where: { membershipNumber },
    });
    if (!existing) {
      isUnique = true;
    }
  }

  // Create membership and activity logs in a transaction
  const result = await prisma.$transaction(async (tx) => {
    const membership = await tx.membership.create({
      data: {
        userId,
        membershipNumber,
        membershipType: payload.membershipType || MembershipType.GENERAL_MEMBER,
        organizationRole: payload.organizationRole || null,
        monthlyContribution: payload.monthlyContribution || null,
        joiningDate: new Date(),
        status: MembershipStatus.PENDING,
      },
    });

    await tx.membershipActivity.create({
      data: {
        membershipId: membership.id,
        activityType: "REGISTRATION" as MembershipActivityType,
        description: `Applied for ${membership.membershipType} membership.`,
        performedBy: userId,
      },
    });

    return membership;
  });

  return result;
};

const updateMembershipStatus = async (
  membershipId: string,
  adminId: string,
  payload: {
    status: MembershipStatus;
    remarks?: string
  }
) => {
  if (!membershipId) {
    throw new customError(status.BAD_REQUEST, "Membership ID is required.");
  }

  const { status: newStatus, remarks } = payload;

  if (newStatus !== MembershipStatus.APPROVED && newStatus !== MembershipStatus.ACTIVE && newStatus !== MembershipStatus.REJECTED) {
    throw new customError(status.BAD_REQUEST, "Invalid status. Can only approve or reject.");
  }

  const membership = await prisma.membership.findUnique({
    where: { id: membershipId },
  });

  if (!membership) {
    throw new customError(status.NOT_FOUND, "Membership not found.");
  }

  if (membership.status !== MembershipStatus.PENDING) {
    throw new customError(
      status.BAD_REQUEST,
      "Membership is not in PENDING status."
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    if (newStatus === MembershipStatus.APPROVED || newStatus === MembershipStatus.ACTIVE) {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year expiry

      // Update membership status
      const updatedMembership = await tx.membership.update({
        where: { id: membershipId },
        data: {
          status: newStatus,
          approvedBy: adminId,
          approvedAt: new Date(),
          expiryDate,
        },
      });

      // Generate unique card number
      let cardNumber = "";
      let isUnique = false;
      while (!isUnique) {
        const currentYear = new Date().getFullYear();
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        cardNumber = `CARD-${currentYear}-${randomDigits}`;

        const existingCard = await tx.membershipCard.findUnique({
          where: { cardNumber },
        });
        if (!existingCard) {
          isUnique = true;
        }
      }

      // Create MembershipCard
      const card = await tx.membershipCard.create({
        data: {
          membershipId,
          cardNumber,
          cardType: CardType.DIGITAL,
          issueDate: new Date(),
          expiryDate,
          cardStatus: CardStatus.ACTIVE,
        },
      });

      // Create MembershipQRCode
      await tx.membershipQRCode.create({
        data: {
          membershipCardId: card.id,
          qrCode: `QR-${card.cardNumber}`,
          verificationUrl: `http://localhost:3000/verify-membership/${card.id}`,
        },
      });

      // Record activity logs
      await tx.membershipActivity.createMany({
        data: [
          {
            membershipId,
            activityType: "MEMBERSHIP_APPROVED" as MembershipActivityType,
            description: `Membership approved by admin. Status set to ${newStatus}.`,
            performedBy: adminId,
          },
          {
            membershipId,
            activityType: "CARD_GENERATED" as MembershipActivityType,
            description: `Membership card generated: ${card.cardNumber}.`,
            performedBy: adminId,
          },
          {
            membershipId,
            activityType: "QR_GENERATED" as MembershipActivityType,
            description: `QR code generated for membership card.`,
            performedBy: adminId,
          },
        ],
      });

      return updatedMembership;
    } else {
      // REJECTED
      const updatedMembership = await tx.membership.update({
        where: { id: membershipId },
        data: {
          status: MembershipStatus.REJECTED,
        },
      });

      // Record activity log
      await tx.membershipActivity.create({
        data: {
          membershipId,
          activityType: "MEMBERSHIP_REJECTED" as MembershipActivityType,
          description: `Membership rejected by admin. Reason: ${remarks || "No reason provided."}`,
          performedBy: adminId,
        },
      });

      return updatedMembership;
    }
  });

  return result;
};

const verifyQrCode = async (qrCode: string, scannedBy: string) => {
  if (!qrCode) {
    throw new customError(status.BAD_REQUEST, "QR Code is required.");
  }

  const qrRecord = await prisma.membershipQRCode.findFirst({
    where: { qrCode },
    include: {
      membershipCard: {
        include: {
          membership: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!qrRecord) {
    throw new customError(status.NOT_FOUND, "Invalid or unrecognized QR Code.");
  }

  const card = qrRecord.membershipCard;
  const membership = card.membership;

  // Validate Card Status and Expiry
  if (card.cardStatus !== CardStatus.ACTIVE) {
    throw new customError(status.BAD_REQUEST, "Membership card is not active.");
  }

  if (card.expiryDate && new Date(card.expiryDate) < new Date()) {
    throw new customError(status.BAD_REQUEST, "Membership card has expired.");
  }

  // Validate Membership Status
  if (
    membership.status !== MembershipStatus.ACTIVE &&
    membership.status !== MembershipStatus.APPROVED
  ) {
    throw new customError(status.BAD_REQUEST, "Associated membership is not active.");
  }

  const result = await prisma.$transaction(async (tx) => {
    // 1. Update QR Code scan count and last scanned timestamp
    const updatedQr = await tx.membershipQRCode.update({
      where: { id: qrRecord.id },
      data: {
        scanCount: { increment: 1 },
        lastScannedAt: new Date(),
      },
    });

    // 2. Create MembershipVerification record
    await tx.membershipVerification.create({
      data: {
        membershipId: membership.id,
        verificationMethod: "QR_CODE" as VerificationMethod,
        verifiedBy: scannedBy,
        verificationStatus: "APPROVED" as VerificationStatus,
        verificationDate: new Date(),
        remarks: "QR Code scan successful.",
      },
    });

    // 3. Create MembershipActivity log
    await tx.membershipActivity.create({
      data: {
        membershipId: membership.id,
        activityType: "QR_VERIFIED" as MembershipActivityType,
        description: `QR code verified successfully by staff/admin. (Scan count: ${updatedQr.scanCount})`,
        performedBy: scannedBy,
      },
    });

    return {
      qrCode: updatedQr,
      card,
      membership,
      user: membership.user,
    };
  });

  return result;
};

const renewMembership = async (
  membershipId: string,
  processedBy: string,
  payload: {
    renewalAmount?: number;
    paymentStatus?: PaymentStatus;
    expiryDate?: string | Date;
  }
) => {
  if (!membershipId) {
    throw new customError(status.BAD_REQUEST, "Membership ID is required.");
  }

  const membership = await prisma.membership.findUnique({
    where: { id: membershipId },
    include: { cards: true },
  });

  if (!membership) {
    throw new customError(status.NOT_FOUND, "Membership not found.");
  }

  if (
    membership.status === MembershipStatus.PENDING ||
    membership.status === MembershipStatus.REJECTED
  ) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot renew a pending or rejected membership application."
    );
  }

  // Determine next expiry date: use provided expiryDate, or calculate 1-year extension
  const nextExpiryDate = payload.expiryDate
    ? new Date(payload.expiryDate)
    : (() => {
        const baseDate =
          membership.expiryDate && new Date(membership.expiryDate) > new Date()
            ? new Date(membership.expiryDate)
            : new Date();
        const date = new Date(baseDate);
        date.setFullYear(date.getFullYear() + 1);
        return date;
      })();

  const result = await prisma.$transaction(async (tx) => {
    // 1. Update membership status and expiry date
    const updatedMembership = await tx.membership.update({
      where: { id: membershipId },
      data: {
        expiryDate: nextExpiryDate,
        status: MembershipStatus.ACTIVE, // activate if expired/suspended
      },
    });

    // 2. Update active/expired cards expiry date
    await tx.membershipCard.updateMany({
      where: {
        membershipId,
        cardStatus: {
          in: [CardStatus.ACTIVE, CardStatus.EXPIRED, CardStatus.PENDING],
        },
      },
      data: {
        expiryDate: nextExpiryDate,
        cardStatus: CardStatus.ACTIVE,
      },
    });

    // 3. Create MembershipRenewal record
    const renewal = await tx.membershipRenewal.create({
      data: {
        membershipId,
        renewalDate: new Date(),
        renewalAmount: payload.renewalAmount || null,
        paymentStatus: payload.paymentStatus || PaymentStatus.PAID,
        nextExpiryDate,
        processedBy,
      },
    });

    // 4. Create MembershipActivity log
    await tx.membershipActivity.create({
      data: {
        membershipId,
        activityType: "MEMBERSHIP_RENEWED" as MembershipActivityType,
        description: `Membership renewed successfully. New expiry date: ${nextExpiryDate.toDateString()}`,
        performedBy: processedBy,
      },
    });

    return {
      membership: updatedMembership,
      renewal,
    };
  });

  return result;
};

export const membershipServices = {
  applyMembership,
  updateMembershipStatus,
  verifyQrCode,
  renewMembership
};
