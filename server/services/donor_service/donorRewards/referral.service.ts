import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 14. REFERRAL SERVICES ====================
export const createReferral = async (payload: any) => {
  if (!payload.referrerId || !payload.referredUserId || !payload.referralCode) {
    throw new customError(status.BAD_REQUEST, "referrerId, referredUserId, and referralCode are required.");
  }

  return await prisma.referral.create({
    data: {
      referrerId: payload.referrerId,
      referredUserId: payload.referredUserId,
      referralCode: payload.referralCode,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllReferrals = async (query?: { referrerId?: string; referredUserId?: string; status?: string }) => {
  const where: any = {};
  if (query?.referrerId) where.referrerId = query.referrerId;
  if (query?.referredUserId) where.referredUserId = query.referredUserId;
  if (query?.status) where.status = query.status;

  return await prisma.referral.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReferralById = async (id: string) => {
  const item = await prisma.referral.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral record not found.");
  }
  return item;
};

export const updateReferral = async (id: string, payload: any) => {
  const item = await prisma.referral.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral record not found.");
  }

  return await prisma.referral.update({
    where: { id },
    data: {
      ...(payload.referralCode && { referralCode: payload.referralCode }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteReferral = async (id: string) => {
  const item = await prisma.referral.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral record not found.");
  }
  await prisma.referral.delete({ where: { id } });
  return { message: "Referral record deleted successfully." };
};
