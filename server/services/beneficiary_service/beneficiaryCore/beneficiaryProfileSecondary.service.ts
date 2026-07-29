import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateBeneficiaryProfile = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary profile not found.");
  }

  return await prisma.beneficiaryProfile.update({
    where: { id },
    data: {
      ...(payload.occupation !== undefined && { occupation: payload.occupation }),
      ...(payload.monthlyIncome !== undefined && { monthlyIncome: Number(payload.monthlyIncome) }),
      ...(payload.familySize !== undefined && { familySize: Number(payload.familySize) }),
      ...(payload.houseType !== undefined && { houseType: payload.houseType }),
      ...(payload.education !== undefined && { education: payload.education }),
      ...(payload.healthCondition !== undefined && { healthCondition: payload.healthCondition }),
      ...(payload.specialNeeds !== undefined && { specialNeeds: payload.specialNeeds }),
    },
  });
};

export const deleteBeneficiaryProfile = async (id: string) => {
  const item = await prisma.beneficiaryProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary profile not found.");
  }
  await prisma.beneficiaryProfile.delete({ where: { id } });
  return { message: "Beneficiary profile deleted successfully." };
};
