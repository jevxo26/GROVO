import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 17. SCHEDULED REPORT SERVICES ====================
export const createScheduledReport = async (payload: any) => {
  if (!payload.reportTemplateId || !payload.frequency || !payload.recipient || !payload.nextRun) {
    throw new customError(status.BAD_REQUEST, "reportTemplateId, frequency, recipient, and nextRun are required.");
  }

  return await prisma.scheduledReport.create({
    data: {
      reportTemplateId: payload.reportTemplateId,
      frequency: payload.frequency,
      recipient: payload.recipient,
      nextRun: new Date(payload.nextRun),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllScheduledReports = async (query?: { reportTemplateId?: string; status?: string }) => {
  const where: any = {};
  if (query?.reportTemplateId) where.reportTemplateId = query.reportTemplateId;
  if (query?.status) where.status = query.status;

  return await prisma.scheduledReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getScheduledReportById = async (id: string) => {
  const item = await prisma.scheduledReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Scheduled report not found.");
  }
  return item;
};

export const updateScheduledReport = async (id: string, payload: any) => {
  const item = await prisma.scheduledReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Scheduled report not found.");
  }

  return await prisma.scheduledReport.update({
    where: { id },
    data: {
      ...(payload.frequency && { frequency: payload.frequency }),
      ...(payload.recipient && { recipient: payload.recipient }),
      ...(payload.nextRun && { nextRun: new Date(payload.nextRun) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteScheduledReport = async (id: string) => {
  const item = await prisma.scheduledReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Scheduled report not found.");
  }
  await prisma.scheduledReport.delete({ where: { id } });
  return { message: "Scheduled report deleted successfully." };
};
