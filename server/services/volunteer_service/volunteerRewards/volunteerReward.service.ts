import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 14. VOLUNTEER REWARD SERVICES ====================
export const createVolunteerReward = async (payload: any) => {
  if (!payload.volunteerId || !payload.title) {
    throw new customError(status.BAD_REQUEST, "volunteerId and title are required.");
  }

  return await prisma.volunteerReward.create({
    data: {
      volunteerId: payload.volunteerId,
      rewardType: payload.rewardType || "APPRECIATION",
      title: payload.title,
      description: payload.description || null,
      rewardDate: payload.rewardDate ? new Date(payload.rewardDate) : new Date(),
    },
  });
};

export const getAllVolunteerRewards = async (query?: { volunteerId?: string; rewardType?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.rewardType) where.rewardType = query.rewardType;

  return await prisma.volunteerReward.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerRewardById = async (id: string) => {
  const item = await prisma.volunteerReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reward not found.");
  }
  return item;
};

export const updateVolunteerReward = async (id: string, payload: any) => {
  const item = await prisma.volunteerReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reward not found.");
  }

  return await prisma.volunteerReward.update({
    where: { id },
    data: {
      ...(payload.rewardType && { rewardType: payload.rewardType }),
      ...(payload.title && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.rewardDate && { rewardDate: new Date(payload.rewardDate) }),
    },
  });
};

export const deleteVolunteerReward = async (id: string) => {
  const item = await prisma.volunteerReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reward not found.");
  }
  await prisma.volunteerReward.delete({ where: { id } });
  return { message: "Volunteer reward deleted successfully." };
};
