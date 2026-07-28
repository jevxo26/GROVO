import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 1. EVENT SERVICES ====================
export const createEvent = async (payload: any) => {
  if (!payload.eventCode || !payload.title || !payload.slug || !payload.categoryId || !payload.eventType || !payload.branchId || !payload.venue || !payload.startDate || !payload.endDate || !payload.createdBy) {
    throw new customError(status.BAD_REQUEST, "eventCode, title, slug, categoryId, eventType, branchId, venue, startDate, endDate, and createdBy are required.");
  }

  const existingCode = await prisma.event.findUnique({
    where: { eventCode: payload.eventCode },
  });
  if (existingCode) {
    throw new customError(status.CONFLICT, `Event code '${payload.eventCode}' already exists`);
  }

  const existingSlug = await prisma.event.findUnique({
    where: { slug: payload.slug },
  });
  if (existingSlug) {
    throw new customError(status.CONFLICT, `Event slug '${payload.slug}' already exists`);
  }

  return await prisma.event.create({
    data: {
      eventCode: payload.eventCode,
      title: payload.title,
      slug: payload.slug,
      categoryId: payload.categoryId,
      description: payload.description || "",
      banner: payload.banner || null,
      thumbnail: payload.thumbnail || null,
      eventType: payload.eventType,
      branchId: payload.branchId,
      venue: payload.venue,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      registrationRequired: payload.registrationRequired !== undefined ? Boolean(payload.registrationRequired) : false,
      maxParticipants: payload.maxParticipants ? Number(payload.maxParticipants) : null,
      status: payload.status || "UPCOMING",
      createdBy: payload.createdBy,
    },
  });
};

export const getAllEvents = async (query?: { categoryId?: string; branchId?: string; eventType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.categoryId) where.categoryId = query.categoryId;
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.eventType) where.eventType = query.eventType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { eventCode: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.event.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventById = async (id: string) => {
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event not found.");
  }
  return item;
};

