import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 14. USER ACTIVITY ANALYTICS SERVICES ====================
export const createUserActivityAnalytics = async (payload: any) => {
  if (!payload.userId) {
    throw new customError(status.BAD_REQUEST, "userId is required.");
  }

  return await prisma.userActivityAnalytics.create({
    data: {
      userId: payload.userId,
      loginCount: payload.loginCount ? Number(payload.loginCount) : 0,
      activeDays: payload.activeDays ? Number(payload.activeDays) : 0,
      lastActive: payload.lastActive ? new Date(payload.lastActive) : null,
      deviceCount: payload.deviceCount ? Number(payload.deviceCount) : 1,
    },
  });
};

export const getAllUserActivityAnalytics = async (query?: { userId?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;

  return await prisma.userActivityAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getUserActivityAnalyticsById = async (id: string) => {
  const item = await prisma.userActivityAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "User activity analytics record not found.");
  }
  return item;
};

export const updateUserActivityAnalytics = async (id: string, payload: any) => {
  const item = await prisma.userActivityAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "User activity analytics record not found.");
  }

  return await prisma.userActivityAnalytics.update({
    where: { id },
    data: {
      ...(payload.loginCount !== undefined && { loginCount: Number(payload.loginCount) }),
      ...(payload.activeDays !== undefined && { activeDays: Number(payload.activeDays) }),
      ...(payload.lastActive !== undefined && { lastActive: payload.lastActive ? new Date(payload.lastActive) : null }),
      ...(payload.deviceCount !== undefined && { deviceCount: Number(payload.deviceCount) }),
    },
  });
};

export const deleteUserActivityAnalytics = async (id: string) => {
  const item = await prisma.userActivityAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "User activity analytics record not found.");
  }
  await prisma.userActivityAnalytics.delete({ where: { id } });
  return { message: "User activity analytics record deleted successfully." };
};
