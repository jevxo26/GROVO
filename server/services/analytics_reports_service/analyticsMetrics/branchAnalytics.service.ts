import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 11. BRANCH ANALYTICS SERVICES ====================
export const createBranchAnalytics = async (payload: any) => {
  if (!payload.branchId) {
    throw new customError(status.BAD_REQUEST, "branchId is required.");
  }

  return await prisma.branchAnalytics.create({
    data: {
      branchId: payload.branchId,
      memberCount: payload.memberCount ? Number(payload.memberCount) : 0,
      donationAmount: payload.donationAmount ? Number(payload.donationAmount) : 0.0,
      campaignCount: payload.campaignCount ? Number(payload.campaignCount) : 0,
      projectCount: payload.projectCount ? Number(payload.projectCount) : 0,
      beneficiaryCount: payload.beneficiaryCount ? Number(payload.beneficiaryCount) : 0,
    },
  });
};

export const getAllBranchAnalytics = async (query?: { branchId?: string }) => {
  const where: any = {};
  if (query?.branchId) where.branchId = query.branchId;

  return await prisma.branchAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBranchAnalyticsById = async (id: string) => {
  const item = await prisma.branchAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Branch analytics record not found.");
  }
  return item;
};

export const updateBranchAnalytics = async (id: string, payload: any) => {
  const item = await prisma.branchAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Branch analytics record not found.");
  }

  return await prisma.branchAnalytics.update({
    where: { id },
    data: {
      ...(payload.memberCount !== undefined && { memberCount: Number(payload.memberCount) }),
      ...(payload.donationAmount !== undefined && { donationAmount: Number(payload.donationAmount) }),
      ...(payload.campaignCount !== undefined && { campaignCount: Number(payload.campaignCount) }),
      ...(payload.projectCount !== undefined && { projectCount: Number(payload.projectCount) }),
      ...(payload.beneficiaryCount !== undefined && { beneficiaryCount: Number(payload.beneficiaryCount) }),
    },
  });
};

export const deleteBranchAnalytics = async (id: string) => {
  const item = await prisma.branchAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Branch analytics record not found.");
  }
  await prisma.branchAnalytics.delete({ where: { id } });
  return { message: "Branch analytics record deleted successfully." };
};
