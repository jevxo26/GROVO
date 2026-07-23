import status from "http-status";
import { MembershipActivityType, MembershipStatus, MembershipType } from "../../../generated/prisma/enums";
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

export const membershipServices = {
  applyMembership,
};
