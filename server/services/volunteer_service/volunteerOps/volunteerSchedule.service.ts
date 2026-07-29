import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 6. VOLUNTEER SCHEDULE SERVICES ====================
export const createVolunteerSchedule = async (payload: any) => {
  if (!payload.volunteerId || !payload.assignmentId || !payload.scheduleDate || !payload.startTime || !payload.endTime || !payload.location) {
    throw new customError(status.BAD_REQUEST, "volunteerId, assignmentId, scheduleDate, startTime, endTime, and location are required.");
  }

  return await prisma.volunteerSchedule.create({
    data: {
      volunteerId: payload.volunteerId,
      assignmentId: payload.assignmentId,
      scheduleDate: new Date(payload.scheduleDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      location: payload.location,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllVolunteerSchedules = async (query?: { volunteerId?: string; assignmentId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.assignmentId) where.assignmentId = query.assignmentId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerSchedule.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerScheduleById = async (id: string) => {
  const item = await prisma.volunteerSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer schedule not found.");
  }
  return item;
};

export const updateVolunteerSchedule = async (id: string, payload: any) => {
  const item = await prisma.volunteerSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer schedule not found.");
  }

  return await prisma.volunteerSchedule.update({
    where: { id },
    data: {
      ...(payload.scheduleDate && { scheduleDate: new Date(payload.scheduleDate) }),
      ...(payload.startTime && { startTime: payload.startTime }),
      ...(payload.endTime && { endTime: payload.endTime }),
      ...(payload.location && { location: payload.location }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteerSchedule = async (id: string) => {
  const item = await prisma.volunteerSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer schedule not found.");
  }
  await prisma.volunteerSchedule.delete({ where: { id } });
  return { message: "Volunteer schedule deleted successfully." };
};
