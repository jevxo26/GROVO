import status from "http-status";
import { GatewayEnvironment } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreatePaymentGatewayPayload {
  gatewayName: string;
  merchantId?: string;
  apiKey?: string;
  secretKey?: string;
  environment?: GatewayEnvironment;
  status?: string;
}

export interface UpdatePaymentGatewayPayload {
  gatewayName?: string;
  merchantId?: string;
  apiKey?: string;
  secretKey?: string;
  environment?: GatewayEnvironment;
  status?: string;
}

const createPaymentGateway = async (payload: CreatePaymentGatewayPayload) => {
  if (!payload.gatewayName) {
    throw new customError(status.BAD_REQUEST, "Gateway name is required.");
  }

  const existing = await prisma.paymentGateway.findUnique({
    where: { gatewayName: payload.gatewayName },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Payment gateway with this name already exists.");
  }

  const gateway = await prisma.paymentGateway.create({
    data: {
      gatewayName: payload.gatewayName,
      merchantId: payload.merchantId || null,
      apiKey: payload.apiKey || null,
      secretKey: payload.secretKey || null,
      environment: payload.environment || GatewayEnvironment.SANDBOX,
      status: payload.status || "ACTIVE",
    },
  });

  return gateway;
};

const getAllPaymentGateways = async (query?: {
  environment?: GatewayEnvironment;
  status?: string;
  search?: string;
}) => {
  const where: any = {};

  if (query?.environment) {
    where.environment = query.environment;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.gatewayName = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  const gateways = await prisma.paymentGateway.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { payments: true, settlements: true } },
    },
  });

  return gateways;
};

const getPaymentGatewayById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Gateway ID is required.");
  }

  const gateway = await prisma.paymentGateway.findUnique({
    where: { id },
    include: {
      _count: { select: { payments: true, settlements: true } },
      settlements: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!gateway) {
    throw new customError(status.NOT_FOUND, "Payment gateway configuration not found.");
  }

  return gateway;
};

const updatePaymentGateway = async (id: string, payload: UpdatePaymentGatewayPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Gateway ID is required.");
  }

  const gateway = await prisma.paymentGateway.findUnique({
    where: { id },
  });

  if (!gateway) {
    throw new customError(status.NOT_FOUND, "Payment gateway configuration not found.");
  }

  if (payload.gatewayName && payload.gatewayName !== gateway.gatewayName) {
    const existing = await prisma.paymentGateway.findUnique({
      where: { gatewayName: payload.gatewayName },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Payment gateway with this name already exists.");
    }
  }

  const updatedGateway = await prisma.paymentGateway.update({
    where: { id },
    data: {
      ...(payload.gatewayName && { gatewayName: payload.gatewayName }),
      ...(payload.merchantId !== undefined && { merchantId: payload.merchantId }),
      ...(payload.apiKey !== undefined && { apiKey: payload.apiKey }),
      ...(payload.secretKey !== undefined && { secretKey: payload.secretKey }),
      ...(payload.environment && { environment: payload.environment }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedGateway;
};

const deletePaymentGateway = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Gateway ID is required.");
  }

  const gateway = await prisma.paymentGateway.findUnique({
    where: { id },
    include: { _count: { select: { payments: true, settlements: true } } },
  });

  if (!gateway) {
    throw new customError(status.NOT_FOUND, "Payment gateway configuration not found.");
  }

  if (gateway._count.payments > 0 || gateway._count.settlements > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete payment gateway with existing payments or settlements. Update status to INACTIVE instead."
    );
  }

  await prisma.paymentGateway.delete({
    where: { id },
  });

  return { message: "Payment gateway deleted successfully." };
};

export const paymentGatewayService = {
  createPaymentGateway,
  getAllPaymentGateways,
  getPaymentGatewayById,
  updatePaymentGateway,
  deletePaymentGateway,
};
