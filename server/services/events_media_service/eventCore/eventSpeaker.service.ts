import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 5. EVENT SPEAKER SERVICES ====================
export const createEventSpeaker = async (payload: any) => {
  if (!payload.eventId || !payload.name || !payload.designation || !payload.organization) {
    throw new customError(status.BAD_REQUEST, "eventId, name, designation, and organization are required.");
  }

  return await prisma.eventSpeaker.create({
    data: {
      eventId: payload.eventId,
      name: payload.name,
      designation: payload.designation,
      organization: payload.organization,
      photo: payload.photo || null,
      bio: payload.bio || null,
    },
  });
};

export const getAllEventSpeakers = async (query?: { eventId?: string; search?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { organization: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.eventSpeaker.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventSpeakerById = async (id: string) => {
  const item = await prisma.eventSpeaker.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event speaker not found.");
  }
  return item;
};

export const updateEventSpeaker = async (id: string, payload: any) => {
  const item = await prisma.eventSpeaker.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event speaker not found.");
  }

  return await prisma.eventSpeaker.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.designation && { designation: payload.designation }),
      ...(payload.organization && { organization: payload.organization }),
      ...(payload.photo !== undefined && { photo: payload.photo }),
      ...(payload.bio !== undefined && { bio: payload.bio }),
    },
  });
};

export const deleteEventSpeaker = async (id: string) => {
  const item = await prisma.eventSpeaker.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event speaker not found.");
  }
  await prisma.eventSpeaker.delete({ where: { id } });
  return { message: "Event speaker deleted successfully." };
};
