import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 4. VOLUNTEER AVAILABILITY SERVICES ====================
export const createVolunteerAvailability = async (payload: any) => {
  if (!payload.volunteerId || !payload.availableDays || !payload.availableFrom || !payload.availableTo) {
    throw new customError(status.BAD_REQUEST, "volunteerId, availableDays, availableFrom, and availableTo are required.");
  }

  return await prisma.volunteerAvailability.create({
    data: {
      volunteerId: payload.volunteerId,
      availableDays: payload.availableDays,
      availableFrom: payload.availableFrom,
      availableTo: payload.availableTo,
      isAvailable: payload.isAvailable !== undefined ? Boolean(payload.isAvailable) : true,
    },
  });
};

export const getAllVolunteerAvailabilities = async (query?: { volunteerId?: string; isAvailable?: boolean }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.isAvailable !== undefined) where.isAvailable = Boolean(query.isAvailable);

  return await prisma.volunteerAvailability.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerAvailabilityById = async (id: string) => {
  const item = await prisma.volunteerAvailability.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer availability record not found.");
  }
  return item;
};

export const updateVolunteerAvailability = async (id: string, payload: any) => {
  const item = await prisma.volunteerAvailability.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer availability record not found.");
  }

  return await prisma.volunteerAvailability.update({
    where: { id },
    data: {
      ...(payload.availableDays && { availableDays: payload.availableDays }),
      ...(payload.availableFrom && { availableFrom: payload.availableFrom }),
      ...(payload.availableTo && { availableTo: payload.availableTo }),
      ...(payload.isAvailable !== undefined && { isAvailable: Boolean(payload.isAvailable) }),
    },
  });
};

export const deleteVolunteerAvailability = async (id: string) => {
  const item = await prisma.volunteerAvailability.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer availability record not found.");
  }
  await prisma.volunteerAvailability.delete({ where: { id } });
  return { message: "Volunteer availability record deleted successfully." };
};
