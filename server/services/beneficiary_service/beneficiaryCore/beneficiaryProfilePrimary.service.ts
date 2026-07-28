import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 2. BENEFICIARY PROFILE SERVICES ====================
export const createBeneficiaryProfile = async (payload: any) => {
  if (!payload.beneficiaryId) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId is required.");
  }

  const existing = await prisma.beneficiaryProfile.findUnique({
    where: { beneficiaryId: payload.beneficiaryId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Profile already exists for this beneficiary"
    );
  }

  return await prisma.beneficiaryProfile.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      occupation: payload.occupation || null,
      monthlyIncome: payload.monthlyIncome
        ? Number(payload.monthlyIncome)
        : 0.0,
      familySize: payload.familySize ? Number(payload.familySize) : 1,
      houseType: payload.houseType || null,
      education: payload.education || null,
      healthCondition: payload.healthCondition || null,
      specialNeeds: payload.specialNeeds || null,
    },
  });
};

export const getAllBeneficiaryProfiles = async (query?: { houseType?: string; education?: string }) => {
  const where: any = {};
  if (query?.houseType) where.houseType = query.houseType;
  if (query?.education) where.education = query.education;

  return await prisma.beneficiaryProfile.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryProfileById = async (id: string) => {
  const item = await prisma.beneficiaryProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary profile not found.");
  }
  return item;
};

