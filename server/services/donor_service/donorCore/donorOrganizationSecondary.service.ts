import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateDonorOrganization = async (id: string, payload: any) => {
  const item = await prisma.donorOrganization.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor organization details not found.");
  }

  return await prisma.donorOrganization.update({
    where: { id },
    data: {
      ...(payload.industry !== undefined && { industry: payload.industry }),
      ...(payload.companySize !== undefined && { companySize: payload.companySize }),
      ...(payload.employeeCount !== undefined && { employeeCount: payload.employeeCount ? Number(payload.employeeCount) : null }),
      ...(payload.address !== undefined && { address: payload.address }),
      ...(payload.city !== undefined && { city: payload.city }),
      ...(payload.country !== undefined && { country: payload.country }),
    },
  });
};

export const deleteDonorOrganization = async (id: string) => {
  const item = await prisma.donorOrganization.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor organization details not found.");
  }
  await prisma.donorOrganization.delete({ where: { id } });
  return { message: "Donor organization details deleted successfully." };
};
