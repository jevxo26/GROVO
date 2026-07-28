import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 16. REPORT TEMPLATE SERVICES ====================
export const createReportTemplate = async (payload: any) => {
  if (!payload.templateName || !payload.reportType) {
    throw new customError(status.BAD_REQUEST, "templateName and reportType are required.");
  }

  return await prisma.reportTemplate.create({
    data: {
      templateName: payload.templateName,
      reportType: payload.reportType,
      configuration: payload.configuration || null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllReportTemplates = async (query?: { reportType?: string; status?: string }) => {
  const where: any = {};
  if (query?.reportType) where.reportType = query.reportType;
  if (query?.status) where.status = query.status;

  return await prisma.reportTemplate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReportTemplateById = async (id: string) => {
  const item = await prisma.reportTemplate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report template not found.");
  }
  return item;
};

export const updateReportTemplate = async (id: string, payload: any) => {
  const item = await prisma.reportTemplate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report template not found.");
  }

  return await prisma.reportTemplate.update({
    where: { id },
    data: {
      ...(payload.templateName && { templateName: payload.templateName }),
      ...(payload.reportType && { reportType: payload.reportType }),
      ...(payload.configuration !== undefined && { configuration: payload.configuration }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteReportTemplate = async (id: string) => {
  const item = await prisma.reportTemplate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report template not found.");
  }
  await prisma.reportTemplate.delete({ where: { id } });
  return { message: "Report template deleted successfully." };
};
