import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 15. REPORT SERVICES ====================
export const createReport = async (payload: any) => {
  if (!payload.reportName || !payload.reportType || !payload.generatedBy || !payload.startDate || !payload.endDate) {
    throw new customError(status.BAD_REQUEST, "reportName, reportType, generatedBy, startDate, and endDate are required.");
  }

  return await prisma.report.create({
    data: {
      reportName: payload.reportName,
      reportType: payload.reportType,
      generatedBy: payload.generatedBy,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      fileUrl: payload.fileUrl || null,
      status: payload.status || "GENERATED",
    },
  });
};

export const getAllReports = async (query?: { reportType?: string; status?: string }) => {
  const where: any = {};
  if (query?.reportType) where.reportType = query.reportType;
  if (query?.status) where.status = query.status;

  return await prisma.report.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReportById = async (id: string) => {
  const item = await prisma.report.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report not found.");
  }
  return item;
};

export const updateReport = async (id: string, payload: any) => {
  const item = await prisma.report.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report not found.");
  }

  return await prisma.report.update({
    where: { id },
    data: {
      ...(payload.reportName && { reportName: payload.reportName }),
      ...(payload.reportType && { reportType: payload.reportType }),
      ...(payload.generatedBy && { generatedBy: payload.generatedBy }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate && { endDate: new Date(payload.endDate) }),
      ...(payload.fileUrl !== undefined && { fileUrl: payload.fileUrl }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteReport = async (id: string) => {
  const item = await prisma.report.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report not found.");
  }
  await prisma.report.delete({ where: { id } });
  return { message: "Report deleted successfully." };
};
