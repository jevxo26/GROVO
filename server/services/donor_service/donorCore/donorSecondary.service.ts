import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateDonor = async (id: string, payload: any) => {
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor not found.");
  }

  if (payload.donorCode && payload.donorCode !== donor.donorCode) {
    const existing = await prisma.donor.findUnique({ where: { donorCode: payload.donorCode } });
    if (existing) {
      throw new customError(status.CONFLICT, `Donor code '${payload.donorCode}' already exists`);
    }
  }

  return await prisma.donor.update({
    where: { id },
    data: {
      ...(payload.donorCode && { donorCode: payload.donorCode }),
      ...(payload.donorType && { donorType: payload.donorType }),
      ...(payload.membershipId !== undefined && { membershipId: payload.membershipId }),
      ...(payload.registrationDate && { registrationDate: new Date(payload.registrationDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDonor = async (id: string) => {
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor not found.");
  }
  await prisma.donor.delete({ where: { id } });
  return { message: "Donor deleted successfully." };
};
