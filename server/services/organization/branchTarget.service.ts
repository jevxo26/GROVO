import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchTargetPayload {
  branchId: string;
  year: number;
  targetMembers?: number;
  targetDonation?: number;
  targetProjects?: number;
  targetCampaigns?: number;
}

export interface UpdateBranchTargetPayload {
  branchId?: string;
  year?: number;
  targetMembers?: number;
  targetDonation?: number;
  targetProjects?: number;
  targetCampaigns?: number;
}

const createBranchTarget = async (payload: CreateBranchTargetPayload) => {
  if (!payload.branchId || !payload.year) {
    throw new customError(status.BAD_REQUEST, "Branch ID and Year are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchTarget.findFirst({
    where: { branchId: payload.branchId, year: payload.year },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `A target configuration already exists for this branch in the year ${payload.year}.`);
  }

  const branchTarget = await prisma.branchTarget.create({
    data: {
      branchId: payload.branchId,
      year: payload.year,
      targetMembers: payload.targetMembers || 0,
      targetDonation: payload.targetDonation || 0,
      targetProjects: payload.targetProjects || 0,
      targetCampaigns: payload.targetCampaigns || 0,
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchTarget;
};

const getAllBranchTargets = async (query?: { branchId?: string; year?: number }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.year) {
    where.year = Number(query.year);
  }

  const branchTargets = await prisma.branchTarget.findMany({
    where,
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchTargets;
};

const getBranchTargetById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Target ID is required.");
  }

  const branchTarget = await prisma.branchTarget.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchTarget) {
    throw new customError(status.NOT_FOUND, "Branch Target record not found.");
  }

  return branchTarget;
};

const updateBranchTarget = async (id: string, payload: UpdateBranchTargetPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Target ID is required.");
  }

  const branchTarget = await prisma.branchTarget.findUnique({ where: { id } });
  if (!branchTarget) {
    throw new customError(status.NOT_FOUND, "Branch Target record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.year || payload.branchId) {
    const targetBranchId = payload.branchId || branchTarget.branchId;
    const targetYear = payload.year !== undefined ? payload.year : branchTarget.year;

    const existing = await prisma.branchTarget.findFirst({
      where: {
        branchId: targetBranchId,
        year: targetYear,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, `A target configuration already exists for this branch in the year ${targetYear}.`);
    }
  }

  const updated = await prisma.branchTarget.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.year !== undefined && { year: payload.year }),
      ...(payload.targetMembers !== undefined && { targetMembers: payload.targetMembers }),
      ...(payload.targetDonation !== undefined && { targetDonation: payload.targetDonation }),
      ...(payload.targetProjects !== undefined && { targetProjects: payload.targetProjects }),
      ...(payload.targetCampaigns !== undefined && { targetCampaigns: payload.targetCampaigns }),
    },
  });

  return updated;
};

const deleteBranchTarget = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Target ID is required.");
  }

  const branchTarget = await prisma.branchTarget.findUnique({ where: { id } });
  if (!branchTarget) {
    throw new customError(status.NOT_FOUND, "Branch Target record not found.");
  }

  await prisma.branchTarget.delete({ where: { id } });

  return { message: "Branch Target record deleted successfully." };
};

export const branchTargetService = {
  createBranchTarget,
  getAllBranchTargets,
  getBranchTargetById,
  updateBranchTarget,
  deleteBranchTarget,
};
