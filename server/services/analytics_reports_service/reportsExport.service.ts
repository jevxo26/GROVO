import { prisma } from "../../lib/prisma";

const createReport = async (payload: any) => {
  return await prisma.report.create({ data: payload });
};

const createReportTemplate = async (payload: any) => {
  return await prisma.reportTemplate.create({ data: payload });
};

const createScheduledReport = async (payload: any) => {
  return await prisma.scheduledReport.create({ data: payload });
};

const createReportExport = async (payload: any) => {
  return await prisma.reportExport.create({ data: payload });
};

export const ReportsExportService = {
  createReport,
  createReportTemplate,
  createScheduledReport,
  createReportExport,
};
