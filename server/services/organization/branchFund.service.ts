import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchFundPayload {
  branchId: string;
  fundName: string;
  currentBalance?: number;
  status?: string;
}

export interface UpdateBranchFundPayload {
  branchId?: string;
  fundName?: string;
  currentBalance?: number;
  status?: string;
}

const createBranchFund = async (payload: CreateBranchFundPayload) => {
  if (!payload.branchId || !payload.fundName) {
    throw new customError(status.BAD_REQUEST, "Branch ID and Fund name are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchFund.findFirst({
    where: { branchId: payload.branchId, fundName: payload.fundName },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "A fund with this name already exists in this branch.");
  }

  const branchFund = await prisma.branchFund.create({
    data: {
      branchId: payload.branchId,
      fundName: payload.fundName,
      currentBalance: payload.currentBalance || 0,
      status: payload.status || "ACTIVE",
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchFund;
};

const getAllBranchFunds = async (query?: { branchId?: string; status?: string; search?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.search) {
    where.fundName = { contains: query.search, mode: "insensitive" };
  }

  const branchFunds = await prisma.branchFund.findMany({
    where,
    orderBy: { fundName: "asc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchFunds;
};

const getBranchFundById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Fund ID is required.");
  }

  const branchFund = await prisma.branchFund.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchFund) {
    throw new customError(status.NOT_FOUND, "Branch Fund record not found.");
  }

  return branchFund;
};

const updateBranchFund = async (id: string, payload: UpdateBranchFundPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Fund ID is required.");
  }

  const branchFund = await prisma.branchFund.findUnique({ where: { id } });
  if (!branchFund) {
    throw new customError(status.NOT_FOUND, "Branch Fund record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.fundName || payload.branchId) {
    const targetBranchId = payload.branchId || branchFund.branchId;
    const targetFundName = payload.fundName || branchFund.fundName;

    const existing = await prisma.branchFund.findFirst({
      where: {
        branchId: targetBranchId,
        fundName: targetFundName,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "A fund with this name already exists in this branch.");
    }
  }

  const updated = await prisma.branchFund.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.fundName && { fundName: payload.fundName }),
      ...(payload.currentBalance !== undefined && { currentBalance: payload.currentBalance }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchFund = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Fund ID is required.");
  }

  const branchFund = await prisma.branchFund.findUnique({ where: { id } });
  if (!branchFund) {
    throw new customError(status.NOT_FOUND, "Branch Fund record not found.");
  }

  if (branchFund.currentBalance > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete a branch fund with a remaining positive balance. Transfer or disburse the balance first."
    );
  }

  await prisma.branchFund.delete({ where: { id } });

  return { message: "Branch Fund record deleted successfully." };
};

export const branchFundService = {
  createBranchFund,
  getAllBranchFunds,
  getBranchFundById,
  updateBranchFund,
  deleteBranchFund,
};
