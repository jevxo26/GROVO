import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 9. VOLUNTEER ANALYTICS SERVICES ====================
export const createVolunteerAnalytics = async (payload: any) => {
  if (!payload.volunteerId) {
    throw new customError(status.BAD_REQUEST, "volunteerId is required.");
  }

  return await prisma.volunteerAnalytics.create({
    data: {
      volunteerId: payload.volunteerId,
      completedTasks: payload.completedTasks ? Number(payload.completedTasks) : 0,
      attendanceRate: payload.attendanceRate ? Number(payload.attendanceRate) : 0.0,
      performanceScore: payload.performanceScore ? Number(payload.performanceScore) : 0.0,
      hoursServed: payload.hoursServed ? Number(payload.hoursServed) : 0.0,
    },
  });
};

export const getAllVolunteerAnalytics = async (query?: { volunteerId?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;

  return await prisma.volunteerAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerAnalyticsById = async (id: string) => {
  const item = await prisma.volunteerAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer analytics record not found.");
  }
  return item;
};

export const updateVolunteerAnalytics = async (id: string, payload: any) => {
  const item = await prisma.volunteerAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer analytics record not found.");
  }

  return await prisma.volunteerAnalytics.update({
    where: { id },
    data: {
      ...(payload.completedTasks !== undefined && { completedTasks: Number(payload.completedTasks) }),
      ...(payload.attendanceRate !== undefined && { attendanceRate: Number(payload.attendanceRate) }),
      ...(payload.performanceScore !== undefined && { performanceScore: Number(payload.performanceScore) }),
      ...(payload.hoursServed !== undefined && { hoursServed: Number(payload.hoursServed) }),
    },
  });
};

export const deleteVolunteerAnalytics = async (id: string) => {
  const item = await prisma.volunteerAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer analytics record not found.");
  }
  await prisma.volunteerAnalytics.delete({ where: { id } });
  return { message: "Volunteer analytics record deleted successfully." };
};
