import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 15. REFERRAL REWARD SERVICES ====================
export const createReferralReward = async (payload: any) => {
  if (!payload.referralId || !payload.rewardType || payload.rewardValue === undefined) {
    throw new customError(status.BAD_REQUEST, "referralId, rewardType, and rewardValue are required.");
  }

  return await prisma.referralReward.create({
    data: {
      referralId: payload.referralId,
      rewardType: payload.rewardType,
      rewardValue: Number(payload.rewardValue),
      status: payload.status || "PENDING",
    },
  });
};

export const getAllReferralRewards = async (query?: { referralId?: string; status?: string }) => {
  const where: any = {};
  if (query?.referralId) where.referralId = query.referralId;
  if (query?.status) where.status = query.status;

  return await prisma.referralReward.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReferralRewardById = async (id: string) => {
  const item = await prisma.referralReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral reward record not found.");
  }
  return item;
};

export const updateReferralReward = async (id: string, payload: any) => {
  const item = await prisma.referralReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral reward record not found.");
  }

  return await prisma.referralReward.update({
    where: { id },
    data: {
      ...(payload.rewardType && { rewardType: payload.rewardType }),
      ...(payload.rewardValue !== undefined && { rewardValue: Number(payload.rewardValue) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteReferralReward = async (id: string) => {
  const item = await prisma.referralReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral reward record not found.");
  }
  await prisma.referralReward.delete({ where: { id } });
  return { message: "Referral reward record deleted successfully." };
};
