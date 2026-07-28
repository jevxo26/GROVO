import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateBeneficiaryCategory = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary category not found.");
  }

  if (payload.categoryName && payload.categoryName !== item.categoryName) {
    const existing = await prisma.beneficiaryCategory.findUnique({ where: { categoryName: payload.categoryName } });
    if (existing) {
      throw new customError(status.CONFLICT, `Category '${payload.categoryName}' already exists`);
    }
  }

  return await prisma.beneficiaryCategory.update({
    where: { id },
    data: {
      ...(payload.categoryName && { categoryName: payload.categoryName }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.priorityLevel && { priorityLevel: payload.priorityLevel }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteBeneficiaryCategory = async (id: string) => {
  const item = await prisma.beneficiaryCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary category not found.");
  }
  await prisma.beneficiaryCategory.delete({ where: { id } });
  return { message: "Beneficiary category deleted successfully." };
};
