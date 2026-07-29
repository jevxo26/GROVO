import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 13. VOLUNTEER PERFORMANCE SERVICES ====================
export const createVolunteerPerformance = async (payload: any) => {
  if (!payload.volunteerId) {
    throw new customError(status.BAD_REQUEST, "volunteerId is required.");
  }

  return await prisma.volunteerPerformance.create({
    data: {
      volunteerId: payload.volunteerId,
      totalAssignments: payload.totalAssignments
        ? Number(payload.totalAssignments)
        : 0,
      completedAssignments: payload.completedAssignments
        ? Number(payload.completedAssignments)
        : 0,
      attendanceRate: payload.attendanceRate
        ? Number(payload.attendanceRate)
        : 0.0,
      performanceScore: payload.performanceScore
        ? Number(payload.performanceScore)
        : 0.0,
      rating: payload.rating ? Number(payload.rating) : 0.0,
    },
  });
};

export const getAllVolunteerPerformances = async (query?: { volunteerId?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;

  return await prisma.volunteerPerformance.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerPerformanceById = async (id: string) => {
  const item = await prisma.volunteerPerformance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer performance record not found.");
  }
  return item;
};

export const updateVolunteerPerformance = async (id: string, payload: any) => {
  const item = await prisma.volunteerPerformance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer performance record not found.");
  }

  return await prisma.volunteerPerformance.update({
    where: { id },
    data: {
      ...(payload.totalAssignments !== undefined && { totalAssignments: Number(payload.totalAssignments) }),
      ...(payload.completedAssignments !== undefined && { completedAssignments: Number(payload.completedAssignments) }),
      ...(payload.attendanceRate !== undefined && { attendanceRate: Number(payload.attendanceRate) }),
      ...(payload.performanceScore !== undefined && { performanceScore: Number(payload.performanceScore) }),
      ...(payload.rating !== undefined && { rating: Number(payload.rating) }),
    },
  });
};

export const deleteVolunteerPerformance = async (id: string) => {
  const item = await prisma.volunteerPerformance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer performance record not found.");
  }
  await prisma.volunteerPerformance.delete({ where: { id } });
  return { message: "Volunteer performance record deleted successfully." };
};
