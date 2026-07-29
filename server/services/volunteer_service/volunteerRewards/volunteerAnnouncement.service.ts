import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 18. VOLUNTEER ANNOUNCEMENT SERVICES ====================
export const createVolunteerAnnouncement = async (payload: any) => {
  if (!payload.title || !payload.description || !payload.startDate || !payload.endDate || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, description, startDate, endDate, and publishedBy are required.");
  }

  return await prisma.volunteerAnnouncement.create({
    data: {
      title: payload.title,
      description: payload.description,
      targetGroup: payload.targetGroup || null,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      publishedBy: payload.publishedBy,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllVolunteerAnnouncements = async (query?: { targetGroup?: string; status?: string }) => {
  const where: any = {};
  if (query?.targetGroup) where.targetGroup = query.targetGroup;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerAnnouncement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerAnnouncementById = async (id: string) => {
  const item = await prisma.volunteerAnnouncement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer announcement not found.");
  }
  return item;
};

export const updateVolunteerAnnouncement = async (id: string, payload: any) => {
  const item = await prisma.volunteerAnnouncement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer announcement not found.");
  }

  return await prisma.volunteerAnnouncement.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description && { description: payload.description }),
      ...(payload.targetGroup !== undefined && { targetGroup: payload.targetGroup }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate && { endDate: new Date(payload.endDate) }),
      ...(payload.publishedBy && { publishedBy: payload.publishedBy }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteerAnnouncement = async (id: string) => {
  const item = await prisma.volunteerAnnouncement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer announcement not found.");
  }
  await prisma.volunteerAnnouncement.delete({ where: { id } });
  return { message: "Volunteer announcement deleted successfully." };
};
