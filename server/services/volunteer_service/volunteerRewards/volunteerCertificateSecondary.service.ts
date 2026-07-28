import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateVolunteerCertificate = async (id: string, payload: any) => {
  const item = await prisma.volunteerCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer certificate not found.");
  }

  if (payload.certificateNumber && payload.certificateNumber !== item.certificateNumber) {
    const existing = await prisma.volunteerCertificate.findUnique({ where: { certificateNumber: payload.certificateNumber } });
    if (existing) {
      throw new customError(status.CONFLICT, `Certificate number '${payload.certificateNumber}' already exists`);
    }
  }

  return await prisma.volunteerCertificate.update({
    where: { id },
    data: {
      ...(payload.certificateType && { certificateType: payload.certificateType }),
      ...(payload.certificateNumber && { certificateNumber: payload.certificateNumber }),
      ...(payload.issueDate && { issueDate: new Date(payload.issueDate) }),
      ...(payload.certificateUrl && { certificateUrl: payload.certificateUrl }),
    },
  });
};

export const deleteVolunteerCertificate = async (id: string) => {
  const item = await prisma.volunteerCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer certificate not found.");
  }
  await prisma.volunteerCertificate.delete({ where: { id } });
  return { message: "Volunteer certificate deleted successfully." };
};
