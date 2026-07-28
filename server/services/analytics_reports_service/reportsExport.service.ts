import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 15. REPORT SERVICES ====================
const createReport = async (payload: any) => {
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

const getAllReports = async (query?: { reportType?: string; status?: string }) => {
  const where: any = {};
  if (query?.reportType) where.reportType = query.reportType;
  if (query?.status) where.status = query.status;

  return await prisma.report.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReportById = async (id: string) => {
  const item = await prisma.report.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report not found.");
  }
  return item;
};

const updateReport = async (id: string, payload: any) => {
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

const deleteReport = async (id: string) => {
  const item = await prisma.report.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report not found.");
  }
  await prisma.report.delete({ where: { id } });
  return { message: "Report deleted successfully." };
};


// ==================== 16. REPORT TEMPLATE SERVICES ====================
const createReportTemplate = async (payload: any) => {
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

const getAllReportTemplates = async (query?: { reportType?: string; status?: string }) => {
  const where: any = {};
  if (query?.reportType) where.reportType = query.reportType;
  if (query?.status) where.status = query.status;

  return await prisma.reportTemplate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReportTemplateById = async (id: string) => {
  const item = await prisma.reportTemplate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report template not found.");
  }
  return item;
};

const updateReportTemplate = async (id: string, payload: any) => {
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

const deleteReportTemplate = async (id: string) => {
  const item = await prisma.reportTemplate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report template not found.");
  }
  await prisma.reportTemplate.delete({ where: { id } });
  return { message: "Report template deleted successfully." };
};


// ==================== 17. SCHEDULED REPORT SERVICES ====================
const createScheduledReport = async (payload: any) => {
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

const getAllScheduledReports = async (query?: { reportTemplateId?: string; status?: string }) => {
  const where: any = {};
  if (query?.reportTemplateId) where.reportTemplateId = query.reportTemplateId;
  if (query?.status) where.status = query.status;

  return await prisma.scheduledReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getScheduledReportById = async (id: string) => {
  const item = await prisma.scheduledReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Scheduled report not found.");
  }
  return item;
};

const updateScheduledReport = async (id: string, payload: any) => {
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

const deleteScheduledReport = async (id: string) => {
  const item = await prisma.scheduledReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Scheduled report not found.");
  }
  await prisma.scheduledReport.delete({ where: { id } });
  return { message: "Scheduled report deleted successfully." };
};


// ==================== 18. REPORT EXPORT SERVICES ====================
const createReportExport = async (payload: any) => {
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

const getAllReportExports = async (query?: { reportId?: string; exportType?: string }) => {
  const where: any = {};
  if (query?.reportId) where.reportId = query.reportId;
  if (query?.exportType) where.exportType = query.exportType;

  return await prisma.reportExport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReportExportById = async (id: string) => {
  const item = await prisma.reportExport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report export not found.");
  }
  return item;
};

const updateReportExport = async (id: string, payload: any) => {
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

const deleteReportExport = async (id: string) => {
  const item = await prisma.reportExport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Report export not found.");
  }
  await prisma.reportExport.delete({ where: { id } });
  return { message: "Report export deleted successfully." };
};


export const reportsExportService = {
  // Report
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  // ReportTemplate
  createReportTemplate,
  getAllReportTemplates,
  getReportTemplateById,
  updateReportTemplate,
  deleteReportTemplate,
  // ScheduledReport
  createScheduledReport,
  getAllScheduledReports,
  getScheduledReportById,
  updateScheduledReport,
  deleteScheduledReport,
  // ReportExport
  createReportExport,
  getAllReportExports,
  getReportExportById,
  updateReportExport,
  deleteReportExport,
};
