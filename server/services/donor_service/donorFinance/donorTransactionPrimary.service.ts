import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 8. DONOR TRANSACTION SERVICES ====================
export const createDonorTransaction = async (payload: any) => {
  if (!payload.walletId || !payload.transactionType || payload.amount === undefined || !payload.referenceNo) {
    throw new customError(status.BAD_REQUEST, "walletId, transactionType, amount, and referenceNo are required.");
  }

  const existing = await prisma.donorTransaction.findUnique({
    where: { referenceNo: payload.referenceNo },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Reference number '${payload.referenceNo}' already exists`
    );
  }

  return await prisma.donorTransaction.create({
    data: {
      walletId: payload.walletId,
      transactionType: payload.transactionType,
      amount: Number(payload.amount),
      referenceNo: payload.referenceNo,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDonorTransactions = async (query?: { walletId?: string; transactionType?: string; status?: string }) => {
  const where: any = {};
  if (query?.walletId) where.walletId = query.walletId;
  if (query?.transactionType) where.transactionType = query.transactionType;
  if (query?.status) where.status = query.status;

  return await prisma.donorTransaction.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorTransactionById = async (id: string) => {
  const item = await prisma.donorTransaction.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor transaction not found.");
  }
  return item;
};

