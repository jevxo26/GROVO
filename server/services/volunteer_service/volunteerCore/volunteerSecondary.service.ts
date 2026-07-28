import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateVolunteer = async (id: string, payload: any) => {
  const item = await prisma.volunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer not found.");
  }

  if (payload.volunteerCode && payload.volunteerCode !== item.volunteerCode) {
    const existing = await prisma.volunteer.findUnique({ where: { volunteerCode: payload.volunteerCode } });
    if (existing) {
      throw new customError(status.CONFLICT, `Volunteer code '${payload.volunteerCode}' already exists`);
    }
  }

  return await prisma.volunteer.update({
    where: { id },
    data: {
      ...(payload.volunteerCode && { volunteerCode: payload.volunteerCode }),
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.membershipId !== undefined && { membershipId: payload.membershipId }),
      ...(payload.joiningDate && { joiningDate: new Date(payload.joiningDate) }),
      ...(payload.experience !== undefined && { experience: payload.experience }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteer = async (id: string) => {
  const item = await prisma.volunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer not found.");
  }
  await prisma.volunteer.delete({ where: { id } });
  return { message: "Volunteer deleted successfully." };
};
