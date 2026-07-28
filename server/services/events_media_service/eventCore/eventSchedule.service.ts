import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 7. EVENT SCHEDULE SERVICES ====================
export const createEventSchedule = async (payload: any) => {
  if (!payload.eventId || !payload.title || !payload.startTime || !payload.endTime) {
    throw new customError(status.BAD_REQUEST, "eventId, title, startTime, and endTime are required.");
  }

  return await prisma.eventSchedule.create({
    data: {
      eventId: payload.eventId,
      title: payload.title,
      startTime: new Date(payload.startTime),
      endTime: new Date(payload.endTime),
      location: payload.location || null,
      description: payload.description || null,
    },
  });
};

export const getAllEventSchedules = async (query?: { eventId?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;

  return await prisma.eventSchedule.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventScheduleById = async (id: string) => {
  const item = await prisma.eventSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event schedule not found.");
  }
  return item;
};

export const updateEventSchedule = async (id: string, payload: any) => {
  const item = await prisma.eventSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event schedule not found.");
  }

  return await prisma.eventSchedule.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.startTime && { startTime: new Date(payload.startTime) }),
      ...(payload.endTime && { endTime: new Date(payload.endTime) }),
      ...(payload.location !== undefined && { location: payload.location }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

export const deleteEventSchedule = async (id: string) => {
  const item = await prisma.eventSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event schedule not found.");
  }
  await prisma.eventSchedule.delete({ where: { id } });
  return { message: "Event schedule deleted successfully." };
};
