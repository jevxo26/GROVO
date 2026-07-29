import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchCoveragePayload {
  branchId: string;
  coverageArea?: number;
  population?: number;
  householdCount?: number;
}

export interface UpdateBranchCoveragePayload {
  branchId?: string;
  coverageArea?: number;
  population?: number;
  householdCount?: number;
}

const createBranchCoverage = async (payload: CreateBranchCoveragePayload) => {
  if (!payload.branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const branchCoverage = await prisma.branchCoverage.create({
    data: {
      branchId: payload.branchId,
      coverageArea: payload.coverageArea !== undefined ? payload.coverageArea : null,
      population: payload.population !== undefined ? payload.population : null,
      householdCount: payload.householdCount !== undefined ? payload.householdCount : null,
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchCoverage;
};

const getAllBranchCoverages = async (query?: { branchId?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }

  const branchCoverages = await prisma.branchCoverage.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchCoverages;
};

const getBranchCoverageById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Coverage ID is required.");
  }

  const branchCoverage = await prisma.branchCoverage.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchCoverage) {
    throw new customError(status.NOT_FOUND, "Branch Coverage record not found.");
  }

  return branchCoverage;
};

const updateBranchCoverage = async (id: string, payload: UpdateBranchCoveragePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Coverage ID is required.");
  }

  const branchCoverage = await prisma.branchCoverage.findUnique({ where: { id } });
  if (!branchCoverage) {
    throw new customError(status.NOT_FOUND, "Branch Coverage record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  const updated = await prisma.branchCoverage.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.coverageArea !== undefined && { coverageArea: payload.coverageArea }),
      ...(payload.population !== undefined && { population: payload.population }),
      ...(payload.householdCount !== undefined && { householdCount: payload.householdCount }),
    },
  });

  return updated;
};

const deleteBranchCoverage = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Coverage ID is required.");
  }

  const branchCoverage = await prisma.branchCoverage.findUnique({ where: { id } });
  if (!branchCoverage) {
    throw new customError(status.NOT_FOUND, "Branch Coverage record not found.");
  }

  await prisma.branchCoverage.delete({ where: { id } });

  return { message: "Branch Coverage record deleted successfully." };
};

export const branchCoverageService = {
  createBranchCoverage,
  getAllBranchCoverages,
  getBranchCoverageById,
  updateBranchCoverage,
  deleteBranchCoverage,
};
