import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface RecordPaymentLogPayload {
  paymentId?: string;
  event: string;
  request?: any;
  response?: any;
  ipAddress?: string;
  status: string;
}

const recordPaymentLog = async (payload: RecordPaymentLogPayload) => {
  if (!payload.event || !payload.status) {
    throw new customError(status.BAD_REQUEST, "Required fields: event and status.");
  }

  if (payload.paymentId) {
    const payment = await prisma.payment.findUnique({
      where: { id: payload.paymentId },
    });
    if (!payment) {
      throw new customError(status.NOT_FOUND, "Payment record not found.");
    }
  }

  const requestStr = payload.request
    ? (typeof payload.request === "string" ? payload.request : JSON.stringify(payload.request))
    : null;

  const responseStr = payload.response
    ? (typeof payload.response === "string" ? payload.response : JSON.stringify(payload.response))
    : null;

  const log = await prisma.paymentLog.create({
    data: {
      paymentId: payload.paymentId || null,
      event: payload.event,
      request: requestStr,
      response: responseStr,
      ipAddress: payload.ipAddress || null,
      status: payload.status,
    },
    include: {
      payment: {
        select: {
          id: true,
          donationId: true,
          transactionId: true,
          paymentStatus: true,
        },
      },
    },
  });

  return log;
};

const getPaymentLogsByPaymentId = async (paymentId: string) => {
  if (!paymentId) {
    throw new customError(status.BAD_REQUEST, "Payment ID is required.");
  }

  const logs = await prisma.paymentLog.findMany({
    where: { paymentId },
    orderBy: { createdAt: "desc" },
  });

  return logs;
};

const getAllPaymentLogs = async (query?: {
  event?: string;
  status?: string;
  ipAddress?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.event) {
    where.event = query.event;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.ipAddress) {
    where.ipAddress = query.ipAddress;
  }

  if (query?.search) {
    where.OR = [
      { event: { contains: query.search, mode: "insensitive" } },
      { request: { contains: query.search, mode: "insensitive" } },
      { response: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [logs, total] = await Promise.all([
    prisma.paymentLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        payment: {
          select: {
            id: true,
            donationId: true,
            transactionId: true,
          },
        },
      },
    }),
    prisma.paymentLog.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: logs,
  };
};

const getPaymentLogById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Payment log ID is required.");
  }

  const log = await prisma.paymentLog.findUnique({
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

  if (!log) {
    throw new customError(status.NOT_FOUND, "Payment log not found.");
  }

  return log;
};

const deletePaymentLog = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Payment log ID is required.");
  }

  const log = await prisma.paymentLog.findUnique({
    where: { id },
  });

  if (!log) {
    throw new customError(status.NOT_FOUND, "Payment log not found.");
  }

  await prisma.paymentLog.delete({
    where: { id },
  });

  return { message: "Payment log deleted successfully." };
};

export const paymentLogService = {
  recordPaymentLog,
  getPaymentLogsByPaymentId,
  getAllPaymentLogs,
  getPaymentLogById,
  deletePaymentLog,
};
