import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateCampaignMilestonePayload {
  campaignId: string;
  title: string;
  description?: string;
  targetAmount: number;
  achievedAt?: string | Date;
  status?: string;
}

export interface UpdateCampaignMilestonePayload {
  title?: string;
  description?: string;
  targetAmount?: number;
  achievedAt?: string | Date;
  status?: string;
}

const createCampaignMilestone = async (payload: CreateCampaignMilestonePayload) => {
  if (!payload.campaignId || !payload.title || !payload.targetAmount) {
    throw new customError(status.BAD_REQUEST, "Required fields: campaignId, title, targetAmount.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: payload.campaignId },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  const milestone = await prisma.campaignMilestone.create({
    data: {
      campaignId: payload.campaignId,
      title: payload.title,
      description: payload.description || null,
      targetAmount: payload.targetAmount,
      achievedAt: payload.achievedAt ? new Date(payload.achievedAt) : null,
      status: payload.status || "PENDING",
    },
  });

  return milestone;
};

const getCampaignMilestonesByCampaignId = async (campaignId: string) => {
  if (!campaignId) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const milestones = await prisma.campaignMilestone.findMany({
    where: { campaignId },
    orderBy: { createdAt: "asc" },
  });

  return milestones;
};

const getCampaignMilestoneById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Milestone ID is required.");
  }

  const milestone = await prisma.campaignMilestone.findUnique({
    where: { id },
    include: {
      campaign: {
        select: { id: true, title: true, campaignCode: true },
      },
    },
  });

  if (!milestone) {
    throw new customError(status.NOT_FOUND, "Campaign milestone not found.");
  }

  return milestone;
};

const updateCampaignMilestone = async (id: string, payload: UpdateCampaignMilestonePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Milestone ID is required.");
  }

  const milestone = await prisma.campaignMilestone.findUnique({
    where: { id },
  });

  if (!milestone) {
    throw new customError(status.NOT_FOUND, "Campaign milestone not found.");
  }

  // If status is being set to COMPLETED and achievedAt is not provided, default achievedAt to now
  let achievedAt = payload.achievedAt !== undefined ? (payload.achievedAt ? new Date(payload.achievedAt) : null) : milestone.achievedAt;
  if (payload.status === "COMPLETED" && !achievedAt) {
    achievedAt = new Date();
  }

  const updatedMilestone = await prisma.campaignMilestone.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.targetAmount !== undefined && { targetAmount: payload.targetAmount }),
      achievedAt,
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedMilestone;
};

const deleteCampaignMilestone = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Milestone ID is required.");
  }

  const milestone = await prisma.campaignMilestone.findUnique({
    where: { id },
  });

  if (!milestone) {
    throw new customError(status.NOT_FOUND, "Campaign milestone not found.");
  }

  await prisma.campaignMilestone.delete({
    where: { id },
  });

  return { message: "Campaign milestone deleted successfully." };
};

export const campaignMilestoneService = {
  createCampaignMilestone,
  getCampaignMilestonesByCampaignId,
  getCampaignMilestoneById,
  updateCampaignMilestone,
  deleteCampaignMilestone,
};
