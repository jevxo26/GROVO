import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface RecordWebhookPayload {
  paymentId?: string;
  gateway: string;
  payload: any;
  verificationStatus?: string;
}

export interface UpdateWebhookStatusPayload {
  verificationStatus: string;
}

const recordPaymentWebhook = async (payload: RecordWebhookPayload) => {
  if (!payload.gateway || !payload.payload) {
    throw new customError(status.BAD_REQUEST, "Gateway name and payload are required.");
  }

  if (payload.paymentId) {
    const payment = await prisma.payment.findUnique({
      where: { id: payload.paymentId },
    });
    if (!payment) {
      throw new customError(status.NOT_FOUND, "Payment record not found.");
    }
  }

  const payloadString = typeof payload.payload === "string"
    ? payload.payload
    : JSON.stringify(payload.payload);

  const webhook = await prisma.paymentWebhook.create({
    data: {
      paymentId: payload.paymentId || null,
      gateway: payload.gateway,
      payload: payloadString,
      verificationStatus: payload.verificationStatus || "PENDING",
      receivedAt: new Date(),
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

  return webhook;
};

const getWebhooksByPaymentId = async (paymentId: string) => {
  if (!paymentId) {
    throw new customError(status.BAD_REQUEST, "Payment ID is required.");
  }

  const webhooks = await prisma.paymentWebhook.findMany({
    where: { paymentId },
    orderBy: { receivedAt: "desc" },
  });

  return webhooks;
};

const getAllPaymentWebhooks = async (query?: {
  gateway?: string;
  verificationStatus?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.gateway) {
    where.gateway = query.gateway;
  }

  if (query?.verificationStatus) {
    where.verificationStatus = query.verificationStatus;
  }

  if (query?.search) {
    where.OR = [
      { gateway: { contains: query.search, mode: "insensitive" } },
      { payload: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [webhooks, total] = await Promise.all([
    prisma.paymentWebhook.findMany({
      where,
      skip,
      take: limit,
      orderBy: { receivedAt: "desc" },
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
    prisma.paymentWebhook.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: webhooks,
  };
};

const getPaymentWebhookById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Webhook ID is required.");
  }

  const webhook = await prisma.paymentWebhook.findUnique({
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

  if (!webhook) {
    throw new customError(status.NOT_FOUND, "Payment webhook record not found.");
  }

  return webhook;
};

const updateWebhookVerificationStatus = async (id: string, payload: UpdateWebhookStatusPayload) => {
  if (!id || !payload.verificationStatus) {
    throw new customError(status.BAD_REQUEST, "Webhook ID and verificationStatus are required.");
  }

  const webhook = await prisma.paymentWebhook.findUnique({
    where: { id },
  });

  if (!webhook) {
    throw new customError(status.NOT_FOUND, "Payment webhook record not found.");
  }

  const updatedWebhook = await prisma.paymentWebhook.update({
    where: { id },
    data: {
      verificationStatus: payload.verificationStatus,
    },
  });

  return updatedWebhook;
};

const deletePaymentWebhook = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Webhook ID is required.");
  }

  const webhook = await prisma.paymentWebhook.findUnique({
    where: { id },
  });

  if (!webhook) {
    throw new customError(status.NOT_FOUND, "Payment webhook record not found.");
  }

  await prisma.paymentWebhook.delete({
    where: { id },
  });

  return { message: "Payment webhook record deleted successfully." };
};

export const paymentWebhookService = {
  recordPaymentWebhook,
  getWebhooksByPaymentId,
  getAllPaymentWebhooks,
  getPaymentWebhookById,
  updateWebhookVerificationStatus,
  deletePaymentWebhook,
};
