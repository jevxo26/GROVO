import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 1. DONOR SERVICES ====================
export const createDonor = async (payload: any) => {
  if (!payload.userId || !payload.donorCode) {
    throw new customError(status.BAD_REQUEST, "userId and donorCode are required.");
  }

  const existingCode = await prisma.donor.findUnique({
    where: { donorCode: payload.donorCode },
  });
  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Donor code '${payload.donorCode}' already exists`
    );
  }

  return await prisma.donor.create({
    data: {
      userId: payload.userId,
      donorCode: payload.donorCode,
      donorType: payload.donorType || "INDIVIDUAL",
      membershipId: payload.membershipId || null,
      registrationDate: payload.registrationDate
        ? new Date(payload.registrationDate)
        : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDonors = async (query?: { donorType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.donorType) where.donorType = query.donorType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.donorCode = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.donor.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorById = async (id: string) => {
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor not found.");
  }
  return donor;
};

