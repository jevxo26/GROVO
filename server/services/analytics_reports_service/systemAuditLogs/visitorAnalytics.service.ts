import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 22. VISITOR ANALYTICS SERVICES ====================
export const createVisitorAnalytics = async (payload: any) => {
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

export const getAllVisitorAnalytics = async () => {
  return await prisma.visitorAnalytics.findMany({
    orderBy: { date: "desc" },
  });
};

export const getVisitorAnalyticsById = async (id: string) => {
  const item = await prisma.visitorAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Visitor analytics record not found.");
  }
  return item;
};

export const updateVisitorAnalytics = async (id: string, payload: any) => {
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

export const deleteVisitorAnalytics = async (id: string) => {
  const item = await prisma.visitorAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Visitor analytics record not found.");
  }
  await prisma.visitorAnalytics.delete({ where: { id } });
  return { message: "Visitor analytics record deleted successfully." };
};
