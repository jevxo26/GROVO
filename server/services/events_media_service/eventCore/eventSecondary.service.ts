import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateEvent = async (id: string, payload: any) => {
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event not found.");
  }

  if (payload.eventCode && payload.eventCode !== item.eventCode) {
    const existingCode = await prisma.event.findUnique({ where: { eventCode: payload.eventCode } });
    if (existingCode) {
      throw new customError(status.CONFLICT, `Event code '${payload.eventCode}' already exists`);
    }
  }

  if (payload.slug && payload.slug !== item.slug) {
    const existingSlug = await prisma.event.findUnique({ where: { slug: payload.slug } });
    if (existingSlug) {
      throw new customError(status.CONFLICT, `Event slug '${payload.slug}' already exists`);
    }
  }

  return await prisma.event.update({
    where: { id },
    data: {
      ...(payload.eventCode && { eventCode: payload.eventCode }),
      ...(payload.title && { title: payload.title }),
      ...(payload.slug && { slug: payload.slug }),
      ...(payload.categoryId && { categoryId: payload.categoryId }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.banner !== undefined && { banner: payload.banner }),
      ...(payload.thumbnail !== undefined && { thumbnail: payload.thumbnail }),
      ...(payload.eventType && { eventType: payload.eventType }),
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.venue && { venue: payload.venue }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate && { endDate: new Date(payload.endDate) }),
      ...(payload.registrationRequired !== undefined && { registrationRequired: Boolean(payload.registrationRequired) }),
      ...(payload.maxParticipants !== undefined && { maxParticipants: payload.maxParticipants ? Number(payload.maxParticipants) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteEvent = async (id: string) => {
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event not found.");
  }
  await prisma.event.delete({ where: { id } });
  return { message: "Event deleted successfully." };
};
