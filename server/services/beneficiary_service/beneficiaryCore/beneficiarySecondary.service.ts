import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateBeneficiary = async (id: string, payload: any) => {
  const item = await prisma.beneficiary.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary not found.");
  }

  if (payload.beneficiaryCode && payload.beneficiaryCode !== item.beneficiaryCode) {
    const existing = await prisma.beneficiary.findUnique({ where: { beneficiaryCode: payload.beneficiaryCode } });
    if (existing) {
      throw new customError(status.CONFLICT, `Beneficiary code '${payload.beneficiaryCode}' already exists`);
    }
  }

  return await prisma.beneficiary.update({
    where: { id },
    data: {
      ...(payload.beneficiaryCode && { beneficiaryCode: payload.beneficiaryCode }),
      ...(payload.fullName && { fullName: payload.fullName }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.nationalId !== undefined && { nationalId: payload.nationalId }),
      ...(payload.dateOfBirth !== undefined && { dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : null }),
      ...(payload.gender && { gender: payload.gender }),
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.address !== undefined && { address: payload.address }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteBeneficiary = async (id: string) => {
  const item = await prisma.beneficiary.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary not found.");
  }
  await prisma.beneficiary.delete({ where: { id } });
  return { message: "Beneficiary deleted successfully." };
};
