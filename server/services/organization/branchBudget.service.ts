import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchBudgetPayload {
  branchId: string;
  fiscalYear: string;
  allocatedBudget: number;
  usedBudget?: number;
  status?: string;
}

export interface UpdateBranchBudgetPayload {
  branchId?: string;
  fiscalYear?: string;
  allocatedBudget?: number;
  usedBudget?: number;
  status?: string;
}

const createBranchBudget = async (payload: CreateBranchBudgetPayload) => {
  if (!payload.branchId || !payload.fiscalYear || payload.allocatedBudget === undefined) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Fiscal Year, and Allocated Budget are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchBudget.findFirst({
    where: { branchId: payload.branchId, fiscalYear: payload.fiscalYear },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `A budget configuration already exists for this branch in the fiscal year ${payload.fiscalYear}.`);
  }

  const used = payload.usedBudget || 0;
  const remaining = payload.allocatedBudget - used;

  const branchBudget = await prisma.branchBudget.create({
    data: {
      branchId: payload.branchId,
      fiscalYear: payload.fiscalYear,
      allocatedBudget: payload.allocatedBudget,
      usedBudget: used,
      remainingBudget: remaining,
      status: payload.status || "ACTIVE",
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchBudget;
};

const getAllBranchBudgets = async (query?: { branchId?: string; fiscalYear?: string; status?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.fiscalYear) {
    where.fiscalYear = query.fiscalYear;
  }
  if (query?.status) {
    where.status = query.status;
  }

  const branchBudgets = await prisma.branchBudget.findMany({
    where,
    orderBy: { fiscalYear: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      _count: {
        select: { expenses: true },
      },
    },
  });

  return branchBudgets;
};

const getBranchBudgetById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Budget ID is required.");
  }

  const branchBudget = await prisma.branchBudget.findUnique({
    where: { id },
    include: {
      branch: true,
      expenses: {
        orderBy: { expenseDate: "desc" },
      },
    },
  });

  if (!branchBudget) {
    throw new customError(status.NOT_FOUND, "Branch Budget record not found.");
  }

  return branchBudget;
};

const updateBranchBudget = async (id: string, payload: UpdateBranchBudgetPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Budget ID is required.");
  }

  const branchBudget = await prisma.branchBudget.findUnique({ where: { id } });
  if (!branchBudget) {
    throw new customError(status.NOT_FOUND, "Branch Budget record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.fiscalYear || payload.branchId) {
    const targetBranchId = payload.branchId || branchBudget.branchId;
    const targetFiscalYear = payload.fiscalYear || branchBudget.fiscalYear;

    const existing = await prisma.branchBudget.findFirst({
      where: {
        branchId: targetBranchId,
        fiscalYear: targetFiscalYear,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, `A budget configuration already exists for this branch in the fiscal year ${targetFiscalYear}.`);
    }
  }

  const allocated = payload.allocatedBudget !== undefined ? payload.allocatedBudget : branchBudget.allocatedBudget;
  const used = payload.usedBudget !== undefined ? payload.usedBudget : branchBudget.usedBudget;
  const remaining = allocated - used;

  const updated = await prisma.branchBudget.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.fiscalYear && { fiscalYear: payload.fiscalYear }),
      allocatedBudget: allocated,
      usedBudget: used,
      remainingBudget: remaining,
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchBudget = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Budget ID is required.");
  }

  const branchBudget = await prisma.branchBudget.findUnique({
    where: { id },
    include: {
      _count: {
        select: { expenses: true },
      },
    },
  });

  if (!branchBudget) {
    throw new customError(status.NOT_FOUND, "Branch Budget record not found.");
  }

  if (branchBudget._count.expenses > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete branch budget because active expense records are linked to it. Remove all expenses first."
    );
  }

  await prisma.branchBudget.delete({ where: { id } });

  return { message: "Branch Budget record deleted successfully." };
};

export const branchBudgetService = {
  createBranchBudget,
  getAllBranchBudgets,
  getBranchBudgetById,
  updateBranchBudget,
  deleteBranchBudget,
};
