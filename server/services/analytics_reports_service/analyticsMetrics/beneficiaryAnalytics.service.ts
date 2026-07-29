import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 10. BENEFICIARY ANALYTICS SERVICES ====================
export const createBeneficiaryAnalytics = async (payload: any) => {
  if (!payload.beneficiaryCategory) {
    throw new customError(status.BAD_REQUEST, "beneficiaryCategory is required.");
  }

  return await prisma.beneficiaryAnalytics.create({
    data: {
      beneficiaryCategory: payload.beneficiaryCategory,
      totalBeneficiaries: payload.totalBeneficiaries ? Number(payload.totalBeneficiaries) : 0,
      totalSupportValue: payload.totalSupportValue ? Number(payload.totalSupportValue) : 0.0,
      activeCases: payload.activeCases ? Number(payload.activeCases) : 0,
      closedCases: payload.closedCases ? Number(payload.closedCases) : 0,
    },
  });
};

export const getAllBeneficiaryAnalytics = async () => {
  return await prisma.beneficiaryAnalytics.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryAnalyticsById = async (id: string) => {
  const item = await prisma.beneficiaryAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary analytics record not found.");
  }
  return item;
};

export const updateBeneficiaryAnalytics = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary analytics record not found.");
  }

  return await prisma.beneficiaryAnalytics.update({
    where: { id },
    data: {
      ...(payload.beneficiaryCategory && { beneficiaryCategory: payload.beneficiaryCategory }),
      ...(payload.totalBeneficiaries !== undefined && { totalBeneficiaries: Number(payload.totalBeneficiaries) }),
      ...(payload.totalSupportValue !== undefined && { totalSupportValue: Number(payload.totalSupportValue) }),
      ...(payload.activeCases !== undefined && { activeCases: Number(payload.activeCases) }),
      ...(payload.closedCases !== undefined && { closedCases: Number(payload.closedCases) }),
    },
  });
};

export const deleteBeneficiaryAnalytics = async (id: string) => {
  const item = await prisma.beneficiaryAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary analytics record not found.");
  }
  await prisma.beneficiaryAnalytics.delete({ where: { id } });
  return { message: "Beneficiary analytics record deleted successfully." };
};
