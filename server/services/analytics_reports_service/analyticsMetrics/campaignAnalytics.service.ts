import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 7. CAMPAIGN ANALYTICS SERVICES ====================
export const createCampaignAnalytics = async (payload: any) => {
  if (!payload.campaignId || payload.targetAmount === undefined) {
    throw new customError(status.BAD_REQUEST, "campaignId and targetAmount are required.");
  }

  return await prisma.campaignAnalytics.create({
    data: {
      campaignId: payload.campaignId,
      targetAmount: Number(payload.targetAmount),
      raisedAmount: payload.raisedAmount ? Number(payload.raisedAmount) : 0.0,
      donorCount: payload.donorCount ? Number(payload.donorCount) : 0,
      completionRate: payload.completionRate ? Number(payload.completionRate) : 0.0,
    },
  });
};

export const getAllCampaignAnalytics = async (query?: { campaignId?: string }) => {
  const where: any = {};
  if (query?.campaignId) where.campaignId = query.campaignId;

  return await prisma.campaignAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getCampaignAnalyticsById = async (id: string) => {
  const item = await prisma.campaignAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Campaign analytics record not found.");
  }
  return item;
};

export const updateCampaignAnalytics = async (id: string, payload: any) => {
  const item = await prisma.campaignAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Campaign analytics record not found.");
  }

  return await prisma.campaignAnalytics.update({
    where: { id },
    data: {
      ...(payload.targetAmount !== undefined && { targetAmount: Number(payload.targetAmount) }),
      ...(payload.raisedAmount !== undefined && { raisedAmount: Number(payload.raisedAmount) }),
      ...(payload.donorCount !== undefined && { donorCount: Number(payload.donorCount) }),
      ...(payload.completionRate !== undefined && { completionRate: Number(payload.completionRate) }),
    },
  });
};

export const deleteCampaignAnalytics = async (id: string) => {
  const item = await prisma.campaignAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Campaign analytics record not found.");
  }
  await prisma.campaignAnalytics.delete({ where: { id } });
  return { message: "Campaign analytics record deleted successfully." };
};
