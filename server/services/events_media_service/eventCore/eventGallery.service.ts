import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 9. EVENT GALLERY SERVICES ====================
export const createEventGallery = async (payload: any) => {
  if (!payload.eventId || !payload.albumId) {
    throw new customError(status.BAD_REQUEST, "eventId and albumId are required.");
  }

  return await prisma.eventGallery.create({
    data: {
      eventId: payload.eventId,
      albumId: payload.albumId,
    },
  });
};

export const getAllEventGalleries = async (query?: { eventId?: string; albumId?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.albumId) where.albumId = query.albumId;

  return await prisma.eventGallery.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventGalleryById = async (id: string) => {
  const item = await prisma.eventGallery.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event gallery link not found.");
  }
  return item;
};

export const updateEventGallery = async (id: string, payload: any) => {
  const item = await prisma.eventGallery.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event gallery link not found.");
  }

  return await prisma.eventGallery.update({
    where: { id },
    data: {
      ...(payload.eventId && { eventId: payload.eventId }),
      ...(payload.albumId && { albumId: payload.albumId }),
    },
  });
};

export const deleteEventGallery = async (id: string) => {
  const item = await prisma.eventGallery.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event gallery link not found.");
  }
  await prisma.eventGallery.delete({ where: { id } });
  return { message: "Event gallery link deleted successfully." };
};
