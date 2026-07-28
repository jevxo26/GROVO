import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 8. EVENT SESSION SERVICES ====================
export const createEventSession = async (payload: any) => {
  if (!payload.scheduleId || !payload.sessionTitle || payload.duration === undefined) {
    throw new customError(status.BAD_REQUEST, "scheduleId, sessionTitle, and duration are required.");
  }

  return await prisma.eventSession.create({
    data: {
      scheduleId: payload.scheduleId,
      sessionTitle: payload.sessionTitle,
      speakerId: payload.speakerId || null,
      duration: Number(payload.duration),
      description: payload.description || null,
    },
  });
};

export const getAllEventSessions = async (query?: { scheduleId?: string; speakerId?: string }) => {
  const where: any = {};
  if (query?.scheduleId) where.scheduleId = query.scheduleId;
  if (query?.speakerId) where.speakerId = query.speakerId;

  return await prisma.eventSession.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventSessionById = async (id: string) => {
  const item = await prisma.eventSession.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event session not found.");
  }
  return item;
};

export const updateEventSession = async (id: string, payload: any) => {
  const item = await prisma.eventSession.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event session not found.");
  }

  return await prisma.eventSession.update({
    where: { id },
    data: {
      ...(payload.sessionTitle && { sessionTitle: payload.sessionTitle }),
      ...(payload.speakerId !== undefined && { speakerId: payload.speakerId }),
      ...(payload.duration !== undefined && { duration: Number(payload.duration) }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

export const deleteEventSession = async (id: string) => {
  const item = await prisma.eventSession.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event session not found.");
  }
  await prisma.eventSession.delete({ where: { id } });
  return { message: "Event session deleted successfully." };
};
