import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateCampaignGoalPayload {
  campaignId: string;
  goalTitle: string;
  targetAmount: number;
  currentAmount?: number;
  status?: string;
}

export interface UpdateCampaignGoalPayload {
  goalTitle?: string;
  targetAmount?: number;
  currentAmount?: number;
  status?: string;
}

const calculateProgress = (target: number, current: number): number => {
  if (target <= 0) return 0;
  return Number(Math.min(100, (current / target) * 100).toFixed(2));
};

const createCampaignGoal = async (payload: CreateCampaignGoalPayload) => {
  if (!payload.campaignId || !payload.goalTitle || !payload.targetAmount) {
    throw new customError(status.BAD_REQUEST, "Required fields: campaignId, goalTitle, targetAmount.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: payload.campaignId },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  const currentAmount = payload.currentAmount || 0;
  const progressPercentage = calculateProgress(payload.targetAmount, currentAmount);

  const goal = await prisma.campaignGoal.create({
    data: {
      campaignId: payload.campaignId,
      goalTitle: payload.goalTitle,
      targetAmount: payload.targetAmount,
      currentAmount,
      progressPercentage,
      status: payload.status || "ACTIVE",
    },
  });

  return goal;
};

const getCampaignGoalsByCampaignId = async (campaignId: string) => {
  if (!campaignId) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const goals = await prisma.campaignGoal.findMany({
    where: { campaignId },
    orderBy: { createdAt: "asc" },
  });

  return goals;
};

const getCampaignGoalById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Goal ID is required.");
  }

  const goal = await prisma.campaignGoal.findUnique({
    where: { id },
    include: {
      campaign: {
        select: { id: true, title: true, campaignCode: true },
      },
    },
  });

  if (!goal) {
    throw new customError(status.NOT_FOUND, "Campaign goal not found.");
  }

  return goal;
};

const updateCampaignGoal = async (id: string, payload: UpdateCampaignGoalPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Goal ID is required.");
  }

  const goal = await prisma.campaignGoal.findUnique({
    where: { id },
  });

  if (!goal) {
    throw new customError(status.NOT_FOUND, "Campaign goal not found.");
  }

  const newTarget = payload.targetAmount !== undefined ? payload.targetAmount : goal.targetAmount;
  const newCurrent = payload.currentAmount !== undefined ? payload.currentAmount : goal.currentAmount;
  const progressPercentage = calculateProgress(newTarget, newCurrent);

  const updatedGoal = await prisma.campaignGoal.update({
    where: { id },
    data: {
      ...(payload.goalTitle && { goalTitle: payload.goalTitle }),
      ...(payload.targetAmount !== undefined && { targetAmount: payload.targetAmount }),
      ...(payload.currentAmount !== undefined && { currentAmount: payload.currentAmount }),
      progressPercentage,
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedGoal;
};

const deleteCampaignGoal = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Goal ID is required.");
  }

  const goal = await prisma.campaignGoal.findUnique({
    where: { id },
  });

  if (!goal) {
    throw new customError(status.NOT_FOUND, "Campaign goal not found.");
  }

  await prisma.campaignGoal.delete({
    where: { id },
  });

  return { message: "Campaign goal deleted successfully." };
};

export const campaignGoalService = {
  createCampaignGoal,
  getCampaignGoalsByCampaignId,
  getCampaignGoalById,
  updateCampaignGoal,
  deleteCampaignGoal,
};
