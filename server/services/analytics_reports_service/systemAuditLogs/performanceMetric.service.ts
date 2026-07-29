import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 23. PERFORMANCE METRIC SERVICES ====================
export const createPerformanceMetric = async (payload: any) => {
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

export const getAllPerformanceMetrics = async (query?: { metricName?: string }) => {
  const where: any = {};
  if (query?.metricName) where.metricName = query.metricName;

  return await prisma.performanceMetric.findMany({
    where,
    orderBy: { recordedAt: "desc" },
  });
};

export const getPerformanceMetricById = async (id: string) => {
  const item = await prisma.performanceMetric.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Performance metric record not found.");
  }
  return item;
};

export const updatePerformanceMetric = async (id: string, payload: any) => {
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

export const deletePerformanceMetric = async (id: string) => {
  const item = await prisma.performanceMetric.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Performance metric record not found.");
  }
  await prisma.performanceMetric.delete({ where: { id } });
  return { message: "Performance metric record deleted successfully." };
};
