import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 1. BENEFICIARY SERVICES ====================
export const createBeneficiary = async (payload: any) => {
  if (!payload.beneficiaryCode || !payload.fullName) {
    throw new customError(status.BAD_REQUEST, "beneficiaryCode and fullName are required.");
  }

  const existingCode = await prisma.beneficiary.findUnique({
    where: { beneficiaryCode: payload.beneficiaryCode },
  });
  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Beneficiary code '${payload.beneficiaryCode}' already exists`
    );
  }

  if (payload.nationalId) {
    const existingNid = await prisma.beneficiary.findUnique({
      where: { nationalId: payload.nationalId },
    });
    if (existingNid) {
      throw new customError(
        status.CONFLICT,
        `National ID '${payload.nationalId}' already exists`
      );
    }
  }

  return await prisma.beneficiary.create({
    data: {
      beneficiaryCode: payload.beneficiaryCode,
      fullName: payload.fullName,
      phone: payload.phone || null,
      nationalId: payload.nationalId || null,
      dateOfBirth: payload.dateOfBirth
        ? new Date(payload.dateOfBirth)
        : null,
      gender: payload.gender || "MALE",
      branchId: payload.branchId || null,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      address: payload.address || null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllBeneficiaries = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { beneficiaryCode: { contains: query.search, mode: "insensitive" } },
      { fullName: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.beneficiary.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryById = async (id: string) => {
  const item = await prisma.beneficiary.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary not found.");
  }
  return item;
};

