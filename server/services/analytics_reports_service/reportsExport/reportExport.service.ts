import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 18. REPORT EXPORT SERVICES ====================
export const createReportExport = async (payload: any) => {
  if (!payload.reportId || !payload.exportType || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "reportId, exportType, and fileUrl are required.");
  }

  return await prisma.reportExport.create({
    data: {
      reportId: payload.reportId,
      exportType: payload.exportType,
      fileUrl: payload.fileUrl,
      generatedAt: payload.generatedAt ? new Date(payload.generatedAt) : new Date(),
    },
  });
};

export const getAllReportExports = async (query?: { reportId?: string; exportType?: string }) => {
  const where: any = {};
  if (query?.reportId) where.reportId = query.reportId;
  if (query?.exportType) where.exportType = query.exportType;

  return await prisma.reportExport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReportExportById = async (id: string) => {
  const item = await prisma.reportExport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report export not found.");
  }
  return item;
};

export const updateReportExport = async (id: string, payload: any) => {
  const item = await prisma.reportExport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report export not found.");
  }

  return await prisma.reportExport.update({
    where: { id },
    data: {
      ...(payload.exportType && { exportType: payload.exportType }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
    },
  });
};

export const deleteReportExport = async (id: string) => {
  const item = await prisma.reportExport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report export not found.");
  }
  await prisma.reportExport.delete({ where: { id } });
  return { message: "Report export deleted successfully." };
};
