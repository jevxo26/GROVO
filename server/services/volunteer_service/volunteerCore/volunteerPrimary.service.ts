import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 1. VOLUNTEER SERVICES ====================
export const createVolunteer = async (payload: any) => {
  if (!payload.userId || !payload.volunteerCode) {
    throw new customError(status.BAD_REQUEST, "userId and volunteerCode are required.");
  }

  const existingCode = await prisma.volunteer.findUnique({
    where: { volunteerCode: payload.volunteerCode },
  });

  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Volunteer code '${payload.volunteerCode}' already exists`
    );
  }

  return await prisma.volunteer.create({
    data: {
      userId: payload.userId,
      volunteerCode: payload.volunteerCode,
      branchId: payload.branchId || null,
      membershipId: payload.membershipId || null,
      joiningDate: payload.joiningDate
        ? new Date(payload.joiningDate)
        : new Date(),
      experience: payload.experience || null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllVolunteers = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.volunteerCode = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.volunteer.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerById = async (id: string) => {
  const item = await prisma.volunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer not found.");
  }
  return item;
};

