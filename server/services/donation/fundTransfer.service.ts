import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateFundTransferPayload {
  fromFundId: string;
  toFundId: string;
  amount: number;
  reason: string;
  approvedBy?: string;
}

const createFundTransfer = async (authenticatedUserId: string | undefined, payload: CreateFundTransferPayload) => {
  if (!payload.fromFundId || !payload.toFundId || !payload.amount || payload.amount <= 0 || !payload.reason) {
    throw new customError(status.BAD_REQUEST, "Required fields: valid fromFundId, toFundId, amount > 0, and reason.");
  }

  if (payload.fromFundId === payload.toFundId) {
    throw new customError(status.BAD_REQUEST, "Source and destination funds cannot be the same.");
  }

  const [fromFund, toFund] = await Promise.all([
    prisma.fund.findUnique({ where: { id: payload.fromFundId } }),
    prisma.fund.findUnique({ where: { id: payload.toFundId } }),
  ]);

  if (!fromFund) {
    throw new customError(status.NOT_FOUND, "Source fund record not found.");
  }

  if (!toFund) {
    throw new customError(status.NOT_FOUND, "Destination fund record not found.");
  }

  if (fromFund.currentBalance < payload.amount) {
    throw new customError(
      status.BAD_REQUEST,
      `Insufficient fund balance. Available: ${fromFund.currentBalance}, Requested: ${payload.amount}`
    );
  }

  const approver = payload.approvedBy || authenticatedUserId || null;

  const result = await prisma.$transaction(async (tx) => {
    await tx.fund.update({
      where: { id: payload.fromFundId },
      data: { currentBalance: { decrement: payload.amount } },
    });

    await tx.fund.update({
      where: { id: payload.toFundId },
      data: { currentBalance: { increment: payload.amount } },
    });

    const transfer = await tx.fundTransfer.create({
      data: {
        fromFundId: payload.fromFundId,
        toFundId: payload.toFundId,
        amount: payload.amount,
        reason: payload.reason,
        approvedBy: approver,
      },
      include: {
        fromFund: { select: { id: true, fundName: true, fundCode: true } },
        toFund: { select: { id: true, fundName: true, fundCode: true } },
        approver: { select: { id: true, fullName: true, email: true } },
      },
    });

    return transfer;
  });

  return result;
};

const getFundTransfersByFundId = async (fundId: string) => {
  if (!fundId) {
    throw new customError(status.BAD_REQUEST, "Fund ID is required.");
  }

  const transfers = await prisma.fundTransfer.findMany({
    where: {
      OR: [{ fromFundId: fundId }, { toFundId: fundId }],
    },
    orderBy: { createdAt: "desc" },
    include: {
      fromFund: { select: { id: true, fundName: true, fundCode: true } },
      toFund: { select: { id: true, fundName: true, fundCode: true } },
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  return transfers;
};

const getAllFundTransfers = async (query?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.search) {
    where.OR = [
      { reason: { contains: query.search, mode: "insensitive" } },
      { fromFund: { fundName: { contains: query.search, mode: "insensitive" } } },
      { toFund: { fundName: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [transfers, total, totalAmountSum] = await Promise.all([
    prisma.fundTransfer.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        fromFund: { select: { id: true, fundName: true, fundCode: true } },
        toFund: { select: { id: true, fundName: true, fundCode: true } },
        approver: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.fundTransfer.count({ where }),
    prisma.fundTransfer.aggregate({
      where,
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalTransferredAmount: totalAmountSum._sum.amount || 0,
    },
    data: transfers,
  };
};

const getFundTransferById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Fund transfer ID is required.");
  }

  const transfer = await prisma.fundTransfer.findUnique({
    where: { id },
    include: {
      fromFund: true,
      toFund: true,
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!transfer) {
    throw new customError(status.NOT_FOUND, "Fund transfer record not found.");
  }

  return transfer;
};

const deleteFundTransfer = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Fund transfer ID is required.");
  }

  const transfer = await prisma.fundTransfer.findUnique({
    where: { id },
  });

  if (!transfer) {
    throw new customError(status.NOT_FOUND, "Fund transfer record not found.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.fund.update({
      where: { id: transfer.fromFundId },
      data: { currentBalance: { increment: transfer.amount } },
    });

    await tx.fund.update({
      where: { id: transfer.toFundId },
      data: { currentBalance: { decrement: transfer.amount } },
    });

    await tx.fundTransfer.delete({
      where: { id },
    });
  });

  return { message: "Fund transfer record deleted and balances reverted successfully." };
};

export const fundTransferService = {
  createFundTransfer,
  getFundTransfersByFundId,
  getAllFundTransfers,
  getFundTransferById,
  deleteFundTransfer,
};
