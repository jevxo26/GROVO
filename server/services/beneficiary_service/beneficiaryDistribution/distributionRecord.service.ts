import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 13. DISTRIBUTION RECORD SERVICES ====================
export const createDistributionRecord = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.distributionCampaignId || !payload.packageId || !payload.distributedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, distributionCampaignId, packageId, and distributedBy are required.");
  }

  return await prisma.distributionRecord.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      distributionCampaignId: payload.distributionCampaignId,
      packageId: payload.packageId,
      distributedBy: payload.distributedBy,
      receivedAt: payload.receivedAt ? new Date(payload.receivedAt) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDistributionRecords = async (query?: { beneficiaryId?: string; distributionCampaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.distributionCampaignId) where.distributionCampaignId = query.distributionCampaignId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionRecord.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDistributionRecordById = async (id: string) => {
  const item = await prisma.distributionRecord.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution record not found.");
  }
  return item;
};

export const updateDistributionRecord = async (id: string, payload: any) => {
  const item = await prisma.distributionRecord.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution record not found.");
  }

  return await prisma.distributionRecord.update({
    where: { id },
    data: {
      ...(payload.beneficiaryId && { beneficiaryId: payload.beneficiaryId }),
      ...(payload.distributionCampaignId && { distributionCampaignId: payload.distributionCampaignId }),
      ...(payload.packageId && { packageId: payload.packageId }),
      ...(payload.distributedBy && { distributedBy: payload.distributedBy }),
      ...(payload.receivedAt && { receivedAt: new Date(payload.receivedAt) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDistributionRecord = async (id: string) => {
  const item = await prisma.distributionRecord.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution record not found.");
  }
  await prisma.distributionRecord.delete({ where: { id } });
  return { message: "Distribution record deleted successfully." };
};
