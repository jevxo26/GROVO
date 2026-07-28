import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 2. VOLUNTEER PROFILE SERVICES ====================
export const createVolunteerProfile = async (payload: any) => {
  if (!payload.volunteerId || !payload.emergencyContact) {
    throw new customError(status.BAD_REQUEST, "volunteerId and emergencyContact are required.");
  }

  const existing = await prisma.volunteerProfile.findUnique({
    where: { volunteerId: payload.volunteerId },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Volunteer profile already exists.");
  }

  return await prisma.volunteerProfile.create({
    data: {
      volunteerId: payload.volunteerId,
      profession: payload.profession || null,
      organization: payload.organization || null,
      skills: payload.skills || null,
      languages: payload.languages || null,
      emergencyContact: payload.emergencyContact,
      bloodGroup: payload.bloodGroup || null,
      availability: payload.availability || null,
    },
  });
};

export const getAllVolunteerProfiles = async (query?: { bloodGroup?: string; search?: string }) => {
  const where: any = {};
  if (query?.bloodGroup) where.bloodGroup = query.bloodGroup;
  if (query?.search) {
    where.OR = [
      { profession: { contains: query.search, mode: "insensitive" } },
      { organization: { contains: query.search, mode: "insensitive" } },
      { skills: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.volunteerProfile.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerProfileById = async (id: string) => {
  const item = await prisma.volunteerProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer profile not found.");
  }
  return item;
};

