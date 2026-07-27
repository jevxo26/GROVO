import { prisma } from "../../lib/prisma";

const createAuditLog = async (payload: any) => {
  return await prisma.auditLog.create({ data: payload });
};

const createSystemLog = async (payload: any) => {
  return await prisma.systemLog.create({ data: payload });
};

const createErrorLog = async (payload: any) => {
  return await prisma.errorLog.create({ data: payload });
};

const createVisitorAnalytics = async (payload: any) => {
  return await prisma.visitorAnalytics.create({ data: payload });
};

const recordPerformanceMetric = async (payload: any) => {
  return await prisma.performanceMetric.create({ data: payload });
};

export const SystemAuditLogsService = {
  createAuditLog,
  createSystemLog,
  createErrorLog,
  createVisitorAnalytics,
  recordPerformanceMetric,
};
