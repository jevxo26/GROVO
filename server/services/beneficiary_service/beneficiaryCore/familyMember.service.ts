import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 3. FAMILY MEMBER SERVICES ====================
export const createFamilyMember = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.name || !payload.relationship) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, name, and relationship are required.");
  }

  return await prisma.familyMember.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      name: payload.name,
      relationship: payload.relationship,
      age: payload.age ? Number(payload.age) : null,
      occupation: payload.occupation || null,
      monthlyIncome: payload.monthlyIncome
        ? Number(payload.monthlyIncome)
        : 0.0,
    },
  });
};

export const getAllFamilyMembers = async (query?: { beneficiaryId?: string; relationship?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.relationship) where.relationship = query.relationship;

  return await prisma.familyMember.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getFamilyMemberById = async (id: string) => {
  const item = await prisma.familyMember.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Family member record not found.");
  }
  return item;
};

export const updateFamilyMember = async (id: string, payload: any) => {
  const item = await prisma.familyMember.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Family member record not found.");
  }

  return await prisma.familyMember.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.relationship && { relationship: payload.relationship }),
      ...(payload.age !== undefined && { age: payload.age ? Number(payload.age) : null }),
      ...(payload.occupation !== undefined && { occupation: payload.occupation }),
      ...(payload.monthlyIncome !== undefined && { monthlyIncome: Number(payload.monthlyIncome) }),
    },
  });
};

export const deleteFamilyMember = async (id: string) => {
  const item = await prisma.familyMember.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Family member record not found.");
  }
  await prisma.familyMember.delete({ where: { id } });
  return { message: "Family member record deleted successfully." };
};
