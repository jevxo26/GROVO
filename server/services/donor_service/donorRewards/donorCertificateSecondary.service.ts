import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

export const updateDonorCertificate = async (id: string, payload: any) => {
  const item = await prisma.donorCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor certificate not found.");
  }

  if (payload.certificateNumber && payload.certificateNumber !== item.certificateNumber) {
    const existing = await prisma.donorCertificate.findUnique({ where: { certificateNumber: payload.certificateNumber } });
    if (existing) {
      throw new customError(status.CONFLICT, `Certificate number '${payload.certificateNumber}' already exists`);
    }
  }

  return await prisma.donorCertificate.update({
    where: { id },
    data: {
      ...(payload.certificateType && { certificateType: payload.certificateType }),
      ...(payload.certificateNumber && { certificateNumber: payload.certificateNumber }),
      ...(payload.issueDate && { issueDate: new Date(payload.issueDate) }),
      ...(payload.downloadUrl && { downloadUrl: payload.downloadUrl }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDonorCertificate = async (id: string) => {
  const item = await prisma.donorCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor certificate not found.");
  }
  await prisma.donorCertificate.delete({ where: { id } });
  return { message: "Donor certificate deleted successfully." };
};
