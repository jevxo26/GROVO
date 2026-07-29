import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateVolunteerProfile = async (id: string, payload: any) => {
  const item = await prisma.volunteerProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer profile not found.");
  }

  return await prisma.volunteerProfile.update({
    where: { id },
    data: {
      ...(payload.profession !== undefined && { profession: payload.profession }),
      ...(payload.organization !== undefined && { organization: payload.organization }),
      ...(payload.skills !== undefined && { skills: payload.skills }),
      ...(payload.languages !== undefined && { languages: payload.languages }),
      ...(payload.emergencyContact && { emergencyContact: payload.emergencyContact }),
      ...(payload.bloodGroup !== undefined && { bloodGroup: payload.bloodGroup }),
      ...(payload.availability !== undefined && { availability: payload.availability }),
    },
  });
};

export const deleteVolunteerProfile = async (id: string) => {
  const item = await prisma.volunteerProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer profile not found.");
  }
  await prisma.volunteerProfile.delete({ where: { id } });
  return { message: "Volunteer profile deleted successfully." };
};
