import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateCorporateDonor = async (id: string, payload: any) => {
  const item = await prisma.corporateDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Corporate donor profile not found.");
  }

  return await prisma.corporateDonor.update({
    where: { id },
    data: {
      ...(payload.companyName && { companyName: payload.companyName }),
      ...(payload.companyRegistrationNo !== undefined && { companyRegistrationNo: payload.companyRegistrationNo }),
      ...(payload.tradeLicense !== undefined && { tradeLicense: payload.tradeLicense }),
      ...(payload.contactPerson && { contactPerson: payload.contactPerson }),
      ...(payload.designation !== undefined && { designation: payload.designation }),
      ...(payload.website !== undefined && { website: payload.website }),
      ...(payload.logo !== undefined && { logo: payload.logo }),
      ...(payload.monthlyCommitment !== undefined && { monthlyCommitment: Number(payload.monthlyCommitment) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteCorporateDonor = async (id: string) => {
  const item = await prisma.corporateDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Corporate donor profile not found.");
  }
  await prisma.corporateDonor.delete({ where: { id } });
  return { message: "Corporate donor profile deleted successfully." };
};
