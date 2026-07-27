import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchPerformancePayload {
  branchId: string;
  year: number;
  achievementScore?: number;
  completedProjects?: number;
  activeMembers?: number;
  totalDonation?: number;
}

export interface UpdateBranchPerformancePayload {
  branchId?: string;
  year?: number;
  achievementScore?: number;
  completedProjects?: number;
  activeMembers?: number;
  totalDonation?: number;
}

const createBranchPerformance = async (payload: CreateBranchPerformancePayload) => {
  if (!payload.branchId || !payload.year) {
    throw new customError(status.BAD_REQUEST, "Branch ID and Year are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchPerformance.findFirst({
    where: { branchId: payload.branchId, year: payload.year },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `A performance metric already exists for this branch in the year ${payload.year}.`);
  }

  const branchPerformance = await prisma.branchPerformance.create({
    data: {
      branchId: payload.branchId,
      year: payload.year,
      achievementScore: payload.achievementScore || 0,
      completedProjects: payload.completedProjects || 0,
      activeMembers: payload.activeMembers || 0,
      totalDonation: payload.totalDonation || 0,
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchPerformance;
};

const getAllBranchPerformances = async (query?: { branchId?: string; year?: number }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.year) {
    where.year = Number(query.year);
  }

  const branchPerformances = await prisma.branchPerformance.findMany({
    where,
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchPerformances;
};

const getBranchPerformanceById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Performance ID is required.");
  }

  const branchPerformance = await prisma.branchPerformance.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchPerformance) {
    throw new customError(status.NOT_FOUND, "Branch Performance record not found.");
  }

  return branchPerformance;
};

const updateBranchPerformance = async (id: string, payload: UpdateBranchPerformancePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Performance ID is required.");
  }

  const branchPerformance = await prisma.branchPerformance.findUnique({ where: { id } });
  if (!branchPerformance) {
    throw new customError(status.NOT_FOUND, "Branch Performance record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.year || payload.branchId) {
    const targetBranchId = payload.branchId || branchPerformance.branchId;
    const targetYear = payload.year !== undefined ? payload.year : branchPerformance.year;

    const existing = await prisma.branchPerformance.findFirst({
      where: {
        branchId: targetBranchId,
        year: targetYear,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, `A performance metric already exists for this branch in the year ${targetYear}.`);
    }
  }

  const updated = await prisma.branchPerformance.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.year !== undefined && { year: payload.year }),
      ...(payload.achievementScore !== undefined && { achievementScore: payload.achievementScore }),
      ...(payload.completedProjects !== undefined && { completedProjects: payload.completedProjects }),
      ...(payload.activeMembers !== undefined && { activeMembers: payload.activeMembers }),
      ...(payload.totalDonation !== undefined && { totalDonation: payload.totalDonation }),
    },
  });

  return updated;
};

const deleteBranchPerformance = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Performance ID is required.");
  }

  const branchPerformance = await prisma.branchPerformance.findUnique({ where: { id } });
  if (!branchPerformance) {
    throw new customError(status.NOT_FOUND, "Branch Performance record not found.");
  }

  await prisma.branchPerformance.delete({ where: { id } });

  return { message: "Branch Performance record deleted successfully." };
};

export const branchPerformanceService = {
  createBranchPerformance,
  getAllBranchPerformances,
  getBranchPerformanceById,
  updateBranchPerformance,
  deleteBranchPerformance,
};
