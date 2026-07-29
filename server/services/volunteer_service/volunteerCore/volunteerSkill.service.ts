import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 3. VOLUNTEER SKILL SERVICES ====================
export const createVolunteerSkill = async (payload: any) => {
  if (!payload.volunteerId || !payload.skillName) {
    throw new customError(status.BAD_REQUEST, "volunteerId and skillName are required.");
  }

  return await prisma.volunteerSkill.create({
    data: {
      volunteerId: payload.volunteerId,
      skillName: payload.skillName,
      skillLevel: payload.skillLevel || "INTERMEDIATE",
      experienceYears: payload.experienceYears ? Number(payload.experienceYears) : 0,
      verifiedBy: payload.verifiedBy || null,
    },
  });
};

export const getAllVolunteerSkills = async (query?: { volunteerId?: string; skillLevel?: string; search?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.skillLevel) where.skillLevel = query.skillLevel;
  if (query?.search) {
    where.skillName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.volunteerSkill.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerSkillById = async (id: string) => {
  const item = await prisma.volunteerSkill.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer skill not found.");
  }
  return item;
};

export const updateVolunteerSkill = async (id: string, payload: any) => {
  const item = await prisma.volunteerSkill.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer skill not found.");
  }

  return await prisma.volunteerSkill.update({
    where: { id },
    data: {
      ...(payload.skillName && { skillName: payload.skillName }),
      ...(payload.skillLevel && { skillLevel: payload.skillLevel }),
      ...(payload.experienceYears !== undefined && { experienceYears: Number(payload.experienceYears) }),
      ...(payload.verifiedBy !== undefined && { verifiedBy: payload.verifiedBy }),
    },
  });
};

export const deleteVolunteerSkill = async (id: string) => {
  const item = await prisma.volunteerSkill.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer skill not found.");
  }
  await prisma.volunteerSkill.delete({ where: { id } });
  return { message: "Volunteer skill deleted successfully." };
};
