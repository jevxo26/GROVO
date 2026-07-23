import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createVolunteer = async (payload: any) => {
  const existingCode = await prisma.volunteer.findUnique({
    where: { volunteerCode: payload.volunteerCode },
  });

  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Volunteer code '${payload.volunteerCode}' already exists`,
    );
  }

  return await prisma.volunteer.create({
    data: {
      userId: payload.userId,
      volunteerCode: payload.volunteerCode,
      branchId: payload.branchId,
      membershipId: payload.membershipId,
      joiningDate: payload.joiningDate
        ? new Date(payload.joiningDate)
        : undefined,
      experience: payload.experience,
      status: payload.status,
    },
  });
};

const getAllVolunteers = async () => {
  return await prisma.volunteer.findMany({ orderBy: { createdAt: "desc" } });
};

const createVolunteerProfile = async (payload: any) => {
  const existing = await prisma.volunteerProfile.findUnique({
    where: { volunteerId: payload.volunteerId },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Volunteer profile already exists");
  }

  return await prisma.volunteerProfile.create({
    data: {
      volunteerId: payload.volunteerId,
      profession: payload.profession,
      organization: payload.organization,
      skills: payload.skills,
      languages: payload.languages,
      emergencyContact: payload.emergencyContact,
      bloodGroup: payload.bloodGroup,
      availability: payload.availability,
    },
  });
};

const createVolunteerSkill = async (payload: any) => {
  return await prisma.volunteerSkill.create({
    data: {
      volunteerId: payload.volunteerId,
      skillName: payload.skillName,
      skillLevel: payload.skillLevel,
      experienceYears: payload.experienceYears
        ? Number(payload.experienceYears)
        : 0,
      verifiedBy: payload.verifiedBy,
    },
  });
};

const createVolunteerAvailability = async (payload: any) => {
  return await prisma.volunteerAvailability.create({
    data: {
      volunteerId: payload.volunteerId,
      availableDays: payload.availableDays,
      availableFrom: payload.availableFrom,
      availableTo: payload.availableTo,
      isAvailable:
        payload.isAvailable !== undefined ? Boolean(payload.isAvailable) : true,
    },
  });
};

const createVolunteerDocument = async (payload: any) => {
  return await prisma.volunteerDocument.create({
    data: {
      volunteerId: payload.volunteerId,
      documentType: payload.documentType,
      documentName: payload.documentName,
      fileUrl: payload.fileUrl,
      verificationStatus: payload.verificationStatus,
    },
  });
};

const createVolunteerActivityLog = async (payload: any) => {
  return await prisma.volunteerActivityLog.create({
    data: {
      volunteerId: payload.volunteerId,
      activity: payload.activity,
      description: payload.description,
      performedBy: payload.performedBy,
    },
  });
};

export const volunteerCoreService = {
  createVolunteer,
  getAllVolunteers,
  createVolunteerProfile,
  createVolunteerSkill,
  createVolunteerAvailability,
  createVolunteerDocument,
  createVolunteerActivityLog,
};
