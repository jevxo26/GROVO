import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 8. PROJECT ANALYTICS SERVICES ====================
export const createProjectAnalytics = async (payload: any) => {
  if (!payload.projectId || payload.budget === undefined || payload.remainingBudget === undefined) {
    throw new customError(status.BAD_REQUEST, "projectId, budget, and remainingBudget are required.");
  }

  return await prisma.projectAnalytics.create({
    data: {
      projectId: payload.projectId,
      budget: Number(payload.budget),
      expense: payload.expense ? Number(payload.expense) : 0.0,
      remainingBudget: Number(payload.remainingBudget),
      beneficiaryCount: payload.beneficiaryCount ? Number(payload.beneficiaryCount) : 0,
      completionRate: payload.completionRate ? Number(payload.completionRate) : 0.0,
    },
  });
};

export const getAllProjectAnalytics = async (query?: { projectId?: string }) => {
  const where: any = {};
  if (query?.projectId) where.projectId = query.projectId;

  return await prisma.projectAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getProjectAnalyticsById = async (id: string) => {
  const item = await prisma.projectAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Project analytics record not found.");
  }
  return item;
};

export const updateProjectAnalytics = async (id: string, payload: any) => {
  const item = await prisma.projectAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Project analytics record not found.");
  }

  return await prisma.projectAnalytics.update({
    where: { id },
    data: {
      ...(payload.budget !== undefined && { budget: Number(payload.budget) }),
      ...(payload.expense !== undefined && { expense: Number(payload.expense) }),
      ...(payload.remainingBudget !== undefined && { remainingBudget: Number(payload.remainingBudget) }),
      ...(payload.beneficiaryCount !== undefined && { beneficiaryCount: Number(payload.beneficiaryCount) }),
      ...(payload.completionRate !== undefined && { completionRate: Number(payload.completionRate) }),
    },
  });
};

export const deleteProjectAnalytics = async (id: string) => {
  const item = await prisma.projectAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Project analytics record not found.");
  }
  await prisma.projectAnalytics.delete({ where: { id } });
  return { message: "Project analytics record deleted successfully." };
};
