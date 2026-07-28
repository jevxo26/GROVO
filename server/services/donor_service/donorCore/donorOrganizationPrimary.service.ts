import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 4. DONOR ORGANIZATION SERVICES ====================
export const createDonorOrganization = async (payload: any) => {
  if (!payload.corporateDonorId) {
    throw new customError(status.BAD_REQUEST, "corporateDonorId is required.");
  }

  const existing = await prisma.donorOrganization.findUnique({
    where: { corporateDonorId: payload.corporateDonorId },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Organization details already exist for this corporate donor."
    );
  }

  return await prisma.donorOrganization.create({
    data: {
      corporateDonorId: payload.corporateDonorId,
      industry: payload.industry || null,
      companySize: payload.companySize || null,
      employeeCount: payload.employeeCount
        ? Number(payload.employeeCount)
        : null,
      address: payload.address || null,
      city: payload.city || null,
      country: payload.country || null,
    },
  });
};

export const getAllDonorOrganizations = async (query?: { industry?: string; country?: string }) => {
  const where: any = {};
  if (query?.industry) where.industry = query.industry;
  if (query?.country) where.country = query.country;

  return await prisma.donorOrganization.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorOrganizationById = async (id: string) => {
  const item = await prisma.donorOrganization.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor organization details not found.");
  }
  return item;
};

