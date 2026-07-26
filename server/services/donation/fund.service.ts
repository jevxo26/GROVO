import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateFundPayload {
  fundName: string;
  fundCode: string;
  description?: string;
  currentBalance?: number;
  status?: string;
}

export interface UpdateFundPayload {
  fundName?: string;
  fundCode?: string;
  description?: string;
  status?: string;
}

const createFund = async (payload: CreateFundPayload) => {
  if (!payload.fundName || !payload.fundCode) {
    throw new customError(status.BAD_REQUEST, "Required fields: fundName and fundCode.");
  }

  const existingName = await prisma.fund.findUnique({
    where: { fundName: payload.fundName },
  });

  if (existingName) {
    throw new customError(status.CONFLICT, "Fund with this name already exists.");
  }

  const existingCode = await prisma.fund.findUnique({
    where: { fundCode: payload.fundCode },
  });

  if (existingCode) {
    throw new customError(status.CONFLICT, "Fund with this code already exists.");
  }

  const fund = await prisma.fund.create({
    data: {
      fundName: payload.fundName,
      fundCode: payload.fundCode.toUpperCase(),
      description: payload.description || null,
      currentBalance: payload.currentBalance && payload.currentBalance >= 0 ? payload.currentBalance : 0,
      status: payload.status || "ACTIVE",
    },
  });

  return fund;
};

const getAllFunds = async (query?: { status?: string; search?: string }) => {
  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { fundName: { contains: query.search, mode: "insensitive" } },
      { fundCode: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [funds, aggregate] = await Promise.all([
    prisma.fund.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            donationItems: true,
            outgoingTransfers: true,
            incomingTransfers: true,
            allocations: true,
          },
        },
      },
    }),
    prisma.fund.aggregate({
      where,
      _sum: { currentBalance: true },
    }),
  ]);

  return {
    meta: {
      totalFunds: funds.length,
      totalCurrentBalance: aggregate._sum.currentBalance || 0,
    },
    data: funds,
  };
};

const getFundById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Fund ID is required.");
  }

  const fund = await prisma.fund.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          donationItems: true,
          outgoingTransfers: true,
          incomingTransfers: true,
          allocations: true,
        },
      },
      outgoingTransfers: { take: 5, orderBy: { createdAt: "desc" } },
      incomingTransfers: { take: 5, orderBy: { createdAt: "desc" } },
      allocations: { take: 5, orderBy: { allocationDate: "desc" } },
    },
  });

  if (!fund) {
    throw new customError(status.NOT_FOUND, "Fund record not found.");
  }

  return fund;
};

const updateFund = async (id: string, payload: UpdateFundPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Fund ID is required.");
  }

  const fund = await prisma.fund.findUnique({
    where: { id },
  });

  if (!fund) {
    throw new customError(status.NOT_FOUND, "Fund record not found.");
  }

  if (payload.fundName && payload.fundName !== fund.fundName) {
    const existing = await prisma.fund.findUnique({
      where: { fundName: payload.fundName },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Fund with this name already exists.");
    }
  }

  if (payload.fundCode && payload.fundCode.toUpperCase() !== fund.fundCode) {
    const existing = await prisma.fund.findUnique({
      where: { fundCode: payload.fundCode.toUpperCase() },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Fund with this code already exists.");
    }
  }

  const updatedFund = await prisma.fund.update({
    where: { id },
    data: {
      ...(payload.fundName && { fundName: payload.fundName }),
      ...(payload.fundCode && { fundCode: payload.fundCode.toUpperCase() }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedFund;
};

const deleteFund = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Fund ID is required.");
  }

  const fund = await prisma.fund.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          donationItems: true,
          outgoingTransfers: true,
          incomingTransfers: true,
          allocations: true,
        },
      },
    },
  });

  if (!fund) {
    throw new customError(status.NOT_FOUND, "Fund record not found.");
  }

  const totalActivity =
    fund._count.donationItems +
    fund._count.outgoingTransfers +
    fund._count.incomingTransfers +
    fund._count.allocations;

  if (totalActivity > 0 || fund.currentBalance > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete fund with non-zero balance or active audit transactions. Update status to INACTIVE instead."
    );
  }

  await prisma.fund.delete({
    where: { id },
  });

  return { message: "Fund deleted successfully." };
};

export const fundService = {
  createFund,
  getAllFunds,
  getFundById,
  updateFund,
  deleteFund,
};
