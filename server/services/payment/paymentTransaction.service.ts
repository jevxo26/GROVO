import status from "http-status";
import { TransactionStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface RecordTransactionPayload {
  paymentId: string;
  gatewayTransactionId?: string;
  gatewayResponse?: any;
  amount: number;
  status?: TransactionStatus;
}

const recordPaymentTransaction = async (payload: RecordTransactionPayload) => {
  if (!payload.paymentId || !payload.amount || payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Required fields: paymentId and amount > 0.");
  }

  const payment = await prisma.payment.findUnique({
    where: { id: payload.paymentId },
  });

  if (!payment) {
    throw new customError(status.NOT_FOUND, "Payment record not found.");
  }

  const responseString = payload.gatewayResponse
    ? (typeof payload.gatewayResponse === "string" ? payload.gatewayResponse : JSON.stringify(payload.gatewayResponse))
    : null;

  const transaction = await prisma.paymentTransaction.create({
    data: {
      paymentId: payload.paymentId,
      gatewayTransactionId: payload.gatewayTransactionId || null,
      gatewayResponse: responseString,
      amount: payload.amount,
      status: payload.status || TransactionStatus.PENDING,
    },
    include: {
      payment: {
        select: {
          id: true,
          donationId: true,
          paymentMethod: true,
          transactionId: true,
        },
      },
    },
  });

  return transaction;
};

const getTransactionsByPaymentId = async (paymentId: string) => {
  if (!paymentId) {
    throw new customError(status.BAD_REQUEST, "Payment ID is required.");
  }

  const transactions = await prisma.paymentTransaction.findMany({
    where: { paymentId },
    orderBy: { createdAt: "desc" },
  });

  return transactions;
};

const getAllPaymentTransactions = async (query?: {
  status?: TransactionStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { gatewayTransactionId: { contains: query.search, mode: "insensitive" } },
      { payment: { transactionId: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [transactions, total] = await Promise.all([
    prisma.paymentTransaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        payment: {
          select: {
            id: true,
            donationId: true,
            paymentMethod: true,
            paymentGateway: { select: { id: true, gatewayName: true } },
          },
        },
      },
    }),
    prisma.paymentTransaction.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: transactions,
  };
};

const getPaymentTransactionById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Transaction ID is required.");
  }

  const transaction = await prisma.paymentTransaction.findUnique({
    where: { id },
    include: {
      payment: {
        include: {
          donation: { select: { id: true, donationNumber: true } },
          paymentGateway: { select: { id: true, gatewayName: true } },
        },
      },
    },
  });

  if (!transaction) {
    throw new customError(status.NOT_FOUND, "Payment transaction log not found.");
  }

  return transaction;
};

const deletePaymentTransaction = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Transaction ID is required.");
  }

  const transaction = await prisma.paymentTransaction.findUnique({
    where: { id },
  });

  if (!transaction) {
    throw new customError(status.NOT_FOUND, "Payment transaction log not found.");
  }

  await prisma.paymentTransaction.delete({
    where: { id },
  });

  return { message: "Payment transaction log deleted successfully." };
};

export const paymentTransactionService = {
  recordPaymentTransaction,
  getTransactionsByPaymentId,
  getAllPaymentTransactions,
  getPaymentTransactionById,
  deletePaymentTransaction,
};
