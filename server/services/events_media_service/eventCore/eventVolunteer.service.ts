import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 6. EVENT VOLUNTEER SERVICES ====================
export const createEventVolunteer = async (payload: any) => {
  if (!payload.eventId || !payload.volunteerId || !payload.role || !payload.assignedBy) {
    throw new customError(status.BAD_REQUEST, "eventId, volunteerId, role, and assignedBy are required.");
  }

  return await prisma.eventVolunteer.create({
    data: {
      eventId: payload.eventId,
      volunteerId: payload.volunteerId,
      role: payload.role,
      assignedBy: payload.assignedBy,
    },
  });
};

export const getAllEventVolunteers = async (query?: { eventId?: string; volunteerId?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.volunteerId) where.volunteerId = query.volunteerId;

  return await prisma.eventVolunteer.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventVolunteerById = async (id: string) => {
  const item = await prisma.eventVolunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event volunteer assignment not found.");
  }
  return item;
};

export const updateEventVolunteer = async (id: string, payload: any) => {
  const item = await prisma.eventVolunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event volunteer assignment not found.");
  }

  return await prisma.eventVolunteer.update({
    where: { id },
    data: {
      ...(payload.role && { role: payload.role }),
      ...(payload.assignedBy && { assignedBy: payload.assignedBy }),
    },
  });
};

export const deleteEventVolunteer = async (id: string) => {
  const item = await prisma.eventVolunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event volunteer assignment not found.");
  }
  await prisma.eventVolunteer.delete({ where: { id } });
  return { message: "Event volunteer assignment deleted successfully." };
};
