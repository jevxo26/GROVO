import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 2. INDIVIDUAL DONOR SERVICES ====================
export const createIndividualDonor = async (payload: any) => {
  if (!payload.donorId) {
    throw new customError(status.BAD_REQUEST, "donorId is required.");
  }

  const existing = await prisma.individualDonor.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Individual profile already exists for this donor.");
  }

  return await prisma.individualDonor.create({
    data: {
      donorId: payload.donorId,
      profession: payload.profession || null,
      organization: payload.organization || null,
      monthlyCommitment: payload.monthlyCommitment
        ? Number(payload.monthlyCommitment)
        : 0.0,
      preferredCampaign: payload.preferredCampaign || null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllIndividualDonors = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { profession: { contains: query.search, mode: "insensitive" } },
      { organization: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.individualDonor.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getIndividualDonorById = async (id: string) => {
  const item = await prisma.individualDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Individual donor profile not found.");
  }
  return item;
};

