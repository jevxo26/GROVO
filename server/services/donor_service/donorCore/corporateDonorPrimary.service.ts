import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 3. CORPORATE DONOR SERVICES ====================
export const createCorporateDonor = async (payload: any) => {
  if (!payload.donorId || !payload.companyName || !payload.contactPerson) {
    throw new customError(status.BAD_REQUEST, "donorId, companyName, and contactPerson are required.");
  }

  const existing = await prisma.corporateDonor.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Corporate profile already exists for this donor.");
  }

  return await prisma.corporateDonor.create({
    data: {
      donorId: payload.donorId,
      companyName: payload.companyName,
      companyRegistrationNo: payload.companyRegistrationNo || null,
      tradeLicense: payload.tradeLicense || null,
      contactPerson: payload.contactPerson,
      designation: payload.designation || null,
      website: payload.website || null,
      logo: payload.logo || null,
      monthlyCommitment: payload.monthlyCommitment
        ? Number(payload.monthlyCommitment)
        : 0.0,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllCorporateDonors = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { companyName: { contains: query.search, mode: "insensitive" } },
      { contactPerson: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.corporateDonor.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getCorporateDonorById = async (id: string) => {
  const item = await prisma.corporateDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Corporate donor profile not found.");
  }
  return item;
};

