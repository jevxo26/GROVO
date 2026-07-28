import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 11. MEMBERSHIP FEE SERVICES ====================
export const createMembershipFee = async (payload: any) => {
  if (!payload.membershipType || payload.minimumAmount === undefined || payload.maximumAmount === undefined) {
    throw new customError(status.BAD_REQUEST, "membershipType, minimumAmount, and maximumAmount are required.");
  }

  return await prisma.membershipFee.create({
    data: {
      membershipType: payload.membershipType,
      minimumAmount: Number(payload.minimumAmount),
      maximumAmount: Number(payload.maximumAmount),
      billingCycle: payload.billingCycle || "YEARLY",
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllMembershipFees = async (query?: { membershipType?: string; status?: string }) => {
  const where: any = {};
  if (query?.membershipType) where.membershipType = query.membershipType;
  if (query?.status) where.status = query.status;

  return await prisma.membershipFee.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getMembershipFeeById = async (id: string) => {
  const item = await prisma.membershipFee.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership fee structure not found.");
  }
  return item;
};

export const updateMembershipFee = async (id: string, payload: any) => {
  const item = await prisma.membershipFee.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership fee structure not found.");
  }

  return await prisma.membershipFee.update({
    where: { id },
    data: {
      ...(payload.membershipType && { membershipType: payload.membershipType }),
      ...(payload.minimumAmount !== undefined && { minimumAmount: Number(payload.minimumAmount) }),
      ...(payload.maximumAmount !== undefined && { maximumAmount: Number(payload.maximumAmount) }),
      ...(payload.billingCycle && { billingCycle: payload.billingCycle }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteMembershipFee = async (id: string) => {
  const item = await prisma.membershipFee.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership fee structure not found.");
  }
  await prisma.membershipFee.delete({ where: { id } });
  return { message: "Membership fee structure deleted successfully." };
};
