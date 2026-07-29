import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 3. EVENT REGISTRATION SERVICES ====================
export const createEventRegistration = async (payload: any) => {
  if (!payload.eventId || !payload.userId || !payload.registrationNumber) {
    throw new customError(status.BAD_REQUEST, "eventId, userId, and registrationNumber are required.");
  }

  const existingReg = await prisma.eventRegistration.findUnique({
    where: { registrationNumber: payload.registrationNumber },
  });
  if (existingReg) {
    throw new customError(status.CONFLICT, `Registration number '${payload.registrationNumber}' already exists`);
  }

  return await prisma.eventRegistration.create({
    data: {
      eventId: payload.eventId,
      userId: payload.userId,
      registrationNumber: payload.registrationNumber,
      registrationDate: payload.registrationDate ? new Date(payload.registrationDate) : new Date(),
      status: payload.status || "CONFIRMED",
    },
  });
};

export const getAllEventRegistrations = async (query?: { eventId?: string; userId?: string; status?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.userId) where.userId = query.userId;
  if (query?.status) where.status = query.status;

  return await prisma.eventRegistration.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventRegistrationById = async (id: string) => {
  const item = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event registration not found.");
  }
  return item;
};

export const updateEventRegistration = async (id: string, payload: any) => {
  const item = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event registration not found.");
  }

  return await prisma.eventRegistration.update({
    where: { id },
    data: {
      ...(payload.status && { status: payload.status }),
      ...(payload.registrationDate && { registrationDate: new Date(payload.registrationDate) }),
    },
  });
};

export const deleteEventRegistration = async (id: string) => {
  const item = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event registration not found.");
  }
  await prisma.eventRegistration.delete({ where: { id } });
  return { message: "Event registration deleted successfully." };
};
