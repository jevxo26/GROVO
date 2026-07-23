import status from "http-status";
import { CardStatus, CardType, MembershipActivityType, MembershipStatus, MembershipType } from "../../../generated/prisma/enums";
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
  }
) => {
  if (!membershipId) {
    throw new customError(status.BAD_REQUEST, "Membership ID is required.");
  }

  const { status: newStatus } = payload;

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

export const membershipServices = {
  applyMembership,
  updateMembershipStatus,
};
