import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 11. ACTIVITY REPORT SERVICES ====================
export const createActivityReport = async (payload: any) => {
  if (!payload.activityId || !payload.reportTitle || !payload.summary || !payload.submittedBy) {
    throw new customError(status.BAD_REQUEST, "activityId, reportTitle, summary, and submittedBy are required.");
  }

  return await prisma.activityReport.create({
    data: {
      activityId: payload.activityId,
      reportTitle: payload.reportTitle,
      summary: payload.summary,
      beneficiariesCount: payload.beneficiariesCount
        ? Number(payload.beneficiariesCount)
        : 0,
      totalExpense: payload.totalExpense ? Number(payload.totalExpense) : 0.0,
      reportFile: payload.reportFile || null,
      submittedBy: payload.submittedBy,
      approvedBy: payload.approvedBy || null,
    },
  });
};

export const getAllActivityReports = async (query?: { activityId?: string; submittedBy?: string }) => {
  const where: any = {};
  if (query?.activityId) where.activityId = query.activityId;
  if (query?.submittedBy) where.submittedBy = query.submittedBy;

  return await prisma.activityReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getActivityReportById = async (id: string) => {
  const item = await prisma.activityReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Activity report not found.");
  }
  return item;
};

export const updateActivityReport = async (id: string, payload: any) => {
  const item = await prisma.activityReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Activity report not found.");
  }

  return await prisma.activityReport.update({
    where: { id },
    data: {
      ...(payload.reportTitle && { reportTitle: payload.reportTitle }),
      ...(payload.summary && { summary: payload.summary }),
      ...(payload.beneficiariesCount !== undefined && { beneficiariesCount: Number(payload.beneficiariesCount) }),
      ...(payload.totalExpense !== undefined && { totalExpense: Number(payload.totalExpense) }),
      ...(payload.reportFile !== undefined && { reportFile: payload.reportFile }),
      ...(payload.submittedBy && { submittedBy: payload.submittedBy }),
      ...(payload.approvedBy !== undefined && { approvedBy: payload.approvedBy }),
    },
  });
};

export const deleteActivityReport = async (id: string) => {
  const item = await prisma.activityReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Activity report not found.");
  }
  await prisma.activityReport.delete({ where: { id } });
  return { message: "Activity report deleted successfully." };
};
