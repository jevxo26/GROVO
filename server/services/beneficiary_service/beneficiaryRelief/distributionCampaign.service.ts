import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 10. DISTRIBUTION CAMPAIGN SERVICES ====================
export const createDistributionCampaign = async (payload: any) => {
  if (!payload.title || !payload.distributionDate || !payload.location) {
    throw new customError(status.BAD_REQUEST, "title, distributionDate, and location are required.");
  }

  return await prisma.distributionCampaign.create({
    data: {
      campaignId: payload.campaignId || null,
      title: payload.title,
      distributionDate: new Date(payload.distributionDate),
      location: payload.location,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllDistributionCampaigns = async (query?: { campaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionCampaign.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDistributionCampaignById = async (id: string) => {
  const item = await prisma.distributionCampaign.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution campaign not found.");
  }
  return item;
};

export const updateDistributionCampaign = async (id: string, payload: any) => {
  const item = await prisma.distributionCampaign.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution campaign not found.");
  }

  return await prisma.distributionCampaign.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.distributionDate && { distributionDate: new Date(payload.distributionDate) }),
      ...(payload.location && { location: payload.location }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDistributionCampaign = async (id: string) => {
  const item = await prisma.distributionCampaign.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution campaign not found.");
  }
  await prisma.distributionCampaign.delete({ where: { id } });
  return { message: "Distribution campaign deleted successfully." };
};
