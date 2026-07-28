import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 19. AUDIT LOG SERVICES ====================
const createAuditLog = async (payload: any) => {
  if (!payload.userId || !payload.module || !payload.action) {
    throw new customError(status.BAD_REQUEST, "userId, module, and action are required.");
  }

  return await prisma.auditLog.create({
    data: {
      userId: payload.userId,
      module: payload.module,
      action: payload.action,
      oldValue: payload.oldValue || null,
      newValue: payload.newValue || null,
      ipAddress: payload.ipAddress || null,
    },
  });
};

const getAllAuditLogs = async (query?: { userId?: string; module?: string; action?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.module) where.module = query.module;
  if (query?.action) where.action = query.action;

  return await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getAuditLogById = async (id: string) => {
  const item = await prisma.auditLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Audit log record not found.");
  }
  return item;
};

const deleteAuditLog = async (id: string) => {
  const item = await prisma.auditLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Audit log record not found.");
  }
  await prisma.auditLog.delete({ where: { id } });
  return { message: "Audit log record deleted successfully." };
};


// ==================== 20. SYSTEM LOG SERVICES ====================
const createSystemLog = async (payload: any) => {
  if (!payload.logLevel || !payload.module || !payload.message) {
    throw new customError(status.BAD_REQUEST, "logLevel, module, and message are required.");
  }

  return await prisma.systemLog.create({
    data: {
      logLevel: payload.logLevel,
      module: payload.module,
      message: payload.message,
      stackTrace: payload.stackTrace || null,
    },
  });
};

const getAllSystemLogs = async (query?: { logLevel?: string; module?: string }) => {
  const where: any = {};
  if (query?.logLevel) where.logLevel = query.logLevel;
  if (query?.module) where.module = query.module;

  return await prisma.systemLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getSystemLogById = async (id: string) => {
  const item = await prisma.systemLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "System log record not found.");
  }
  return item;
};

const deleteSystemLog = async (id: string) => {
  const item = await prisma.systemLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "System log record not found.");
  }
  await prisma.systemLog.delete({ where: { id } });
  return { message: "System log record deleted successfully." };
};


// ==================== 21. ERROR LOG SERVICES ====================
const createErrorLog = async (payload: any) => {
  if (!payload.errorCode || !payload.message || !payload.module) {
    throw new customError(status.BAD_REQUEST, "errorCode, message, and module are required.");
  }

  return await prisma.errorLog.create({
    data: {
      errorCode: payload.errorCode,
      message: payload.message,
      module: payload.module,
      userId: payload.userId || null,
      stackTrace: payload.stackTrace || null,
      resolved: payload.resolved !== undefined ? Boolean(payload.resolved) : false,
    },
  });
};

const getAllErrorLogs = async (query?: { errorCode?: string; module?: string; resolved?: boolean }) => {
  const where: any = {};
  if (query?.errorCode) where.errorCode = query.errorCode;
  if (query?.module) where.module = query.module;
  if (query?.resolved !== undefined) where.resolved = Boolean(query.resolved);

  return await prisma.errorLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getErrorLogById = async (id: string) => {
  const item = await prisma.errorLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Error log record not found.");
  }
  return item;
};

const updateErrorLog = async (id: string, payload: any) => {
  const item = await prisma.errorLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Error log record not found.");
  }

  return await prisma.errorLog.update({
    where: { id },
    data: {
      ...(payload.resolved !== undefined && { resolved: Boolean(payload.resolved) }),
    },
  });
};

const deleteErrorLog = async (id: string) => {
  const item = await prisma.errorLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Error log record not found.");
  }
  await prisma.errorLog.delete({ where: { id } });
  return { message: "Error log record deleted successfully." };
};


// ==================== 22. VISITOR ANALYTICS SERVICES ====================
const createVisitorAnalytics = async (payload: any) => {
  return await prisma.visitorAnalytics.create({
    data: {
      date: payload.date ? new Date(payload.date) : new Date(),
      totalVisitors: payload.totalVisitors ? Number(payload.totalVisitors) : 0,
      uniqueVisitors: payload.uniqueVisitors ? Number(payload.uniqueVisitors) : 0,
      pageViews: payload.pageViews ? Number(payload.pageViews) : 0,
      bounceRate: payload.bounceRate ? Number(payload.bounceRate) : 0.0,
      averageSessionDuration: payload.averageSessionDuration ? Number(payload.averageSessionDuration) : 0.0,
    },
  });
};

const getAllVisitorAnalytics = async () => {
  return await prisma.visitorAnalytics.findMany({
    orderBy: { date: "desc" },
  });
};

const getVisitorAnalyticsById = async (id: string) => {
  const item = await prisma.visitorAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Visitor analytics record not found.");
  }
  return item;
};

const updateVisitorAnalytics = async (id: string, payload: any) => {
  const item = await prisma.visitorAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Visitor analytics record not found.");
  }

  return await prisma.visitorAnalytics.update({
    where: { id },
    data: {
      ...(payload.totalVisitors !== undefined && { totalVisitors: Number(payload.totalVisitors) }),
      ...(payload.uniqueVisitors !== undefined && { uniqueVisitors: Number(payload.uniqueVisitors) }),
      ...(payload.pageViews !== undefined && { pageViews: Number(payload.pageViews) }),
      ...(payload.bounceRate !== undefined && { bounceRate: Number(payload.bounceRate) }),
      ...(payload.averageSessionDuration !== undefined && { averageSessionDuration: Number(payload.averageSessionDuration) }),
    },
  });
};

const deleteVisitorAnalytics = async (id: string) => {
  const item = await prisma.visitorAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Visitor analytics record not found.");
  }
  await prisma.visitorAnalytics.delete({ where: { id } });
  return { message: "Visitor analytics record deleted successfully." };
};


// ==================== 23. PERFORMANCE METRIC SERVICES ====================
const createPerformanceMetric = async (payload: any) => {
  if (!payload.metricName || payload.metricValue === undefined || !payload.unit) {
    throw new customError(status.BAD_REQUEST, "metricName, metricValue, and unit are required.");
  }

  return await prisma.performanceMetric.create({
    data: {
      metricName: payload.metricName,
      metricValue: Number(payload.metricValue),
      unit: payload.unit,
      recordedAt: payload.recordedAt ? new Date(payload.recordedAt) : new Date(),
    },
  });
};

const getAllPerformanceMetrics = async (query?: { metricName?: string }) => {
  const where: any = {};
  if (query?.metricName) where.metricName = query.metricName;

  return await prisma.performanceMetric.findMany({
    where,
    orderBy: { recordedAt: "desc" },
  });
};

const getPerformanceMetricById = async (id: string) => {
  const item = await prisma.performanceMetric.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Performance metric record not found.");
  }
  return item;
};

const updatePerformanceMetric = async (id: string, payload: any) => {
  const item = await prisma.performanceMetric.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Performance metric record not found.");
  }

  return await prisma.performanceMetric.update({
    where: { id },
    data: {
      ...(payload.metricName && { metricName: payload.metricName }),
      ...(payload.metricValue !== undefined && { metricValue: Number(payload.metricValue) }),
      ...(payload.unit && { unit: payload.unit }),
    },
  });
};

const deletePerformanceMetric = async (id: string) => {
  const item = await prisma.performanceMetric.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Performance metric record not found.");
  }
  await prisma.performanceMetric.delete({ where: { id } });
  return { message: "Performance metric record deleted successfully." };
};


export const systemAuditLogsService = {
  // AuditLog
  createAuditLog,
  getAllAuditLogs,
  getAuditLogById,
  deleteAuditLog,
  // SystemLog
  createSystemLog,
  getAllSystemLogs,
  getSystemLogById,
  deleteSystemLog,
  // ErrorLog
  createErrorLog,
  getAllErrorLogs,
  getErrorLogById,
  updateErrorLog,
  deleteErrorLog,
  // VisitorAnalytics
  createVisitorAnalytics,
  getAllVisitorAnalytics,
  getVisitorAnalyticsById,
  updateVisitorAnalytics,
  deleteVisitorAnalytics,
  // PerformanceMetric
  createPerformanceMetric,
  getAllPerformanceMetrics,
  getPerformanceMetricById,
  updatePerformanceMetric,
  deletePerformanceMetric,
};
