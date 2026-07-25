import status from "http-status";
import { SettlementStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateSettlementPayload {
  paymentGatewayId: string;
  totalCollected: number;
  processingFee?: number;
  settlementDate: string | Date;
  status?: SettlementStatus;
}

export interface UpdateSettlementStatusPayload {
  status: SettlementStatus;
  processingFee?: number;
}

const createSettlement = async (payload: CreateSettlementPayload) => {
  if (!payload.paymentGatewayId || payload.totalCollected === undefined || payload.totalCollected < 0 || !payload.settlementDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: paymentGatewayId, totalCollected >= 0, and settlementDate.");
  }

  const gateway = await prisma.paymentGateway.findUnique({
    where: { id: payload.paymentGatewayId },
  });

  if (!gateway) {
    throw new customError(status.NOT_FOUND, "Payment gateway configuration not found.");
  }

  const processingFee = payload.processingFee && payload.processingFee >= 0 ? payload.processingFee : 0;
  const netAmount = payload.totalCollected - processingFee;

  const settlement = await prisma.settlement.create({
    data: {
      paymentGatewayId: payload.paymentGatewayId,
      totalCollected: payload.totalCollected,
      processingFee,
      netAmount,
      settlementDate: new Date(payload.settlementDate),
      status: payload.status || SettlementStatus.PENDING,
    },
    include: {
      paymentGateway: { select: { id: true, gatewayName: true, environment: true } },
    },
  });

  return settlement;
};

const getSettlementsByGatewayId = async (paymentGatewayId: string) => {
  if (!paymentGatewayId) {
    throw new customError(status.BAD_REQUEST, "Payment gateway ID is required.");
  }

  const settlements = await prisma.settlement.findMany({
    where: { paymentGatewayId },
    orderBy: { settlementDate: "desc" },
  });

  return settlements;
};

const getAllSettlements = async (query?: {
  paymentGatewayId?: string;
  status?: SettlementStatus;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.paymentGatewayId) {
    where.paymentGatewayId = query.paymentGatewayId;
  }

  if (query?.status) {
    where.status = query.status;
  }

  const [settlements, total, aggregate] = await Promise.all([
    prisma.settlement.findMany({
      where,
      skip,
      take: limit,
      orderBy: { settlementDate: "desc" },
      include: {
        paymentGateway: { select: { id: true, gatewayName: true, environment: true } },
      },
    }),
    prisma.settlement.count({ where }),
    prisma.settlement.aggregate({
      where: { ...where, status: SettlementStatus.COMPLETED },
      _sum: { netAmount: true, totalCollected: true, processingFee: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalCollectedSum: aggregate._sum.totalCollected || 0,
      totalProcessingFeeSum: aggregate._sum.processingFee || 0,
      totalNetSettledAmount: aggregate._sum.netAmount || 0,
    },
    data: settlements,
  };
};

const getSettlementById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Settlement ID is required.");
  }

  const settlement = await prisma.settlement.findUnique({
    where: { id },
    include: {
      paymentGateway: true,
    },
  });

  if (!settlement) {
    throw new customError(status.NOT_FOUND, "Settlement record not found.");
  }

  return settlement;
};

const updateSettlementStatus = async (id: string, payload: UpdateSettlementStatusPayload) => {
  if (!id || !payload.status) {
    throw new customError(status.BAD_REQUEST, "Settlement ID and status are required.");
  }

  const settlement = await prisma.settlement.findUnique({
    where: { id },
  });

  if (!settlement) {
    throw new customError(status.NOT_FOUND, "Settlement record not found.");
  }

  const processingFee = payload.processingFee !== undefined ? payload.processingFee : settlement.processingFee;
  const netAmount = settlement.totalCollected - processingFee;

  const updatedSettlement = await prisma.settlement.update({
    where: { id },
    data: {
      status: payload.status,
      processingFee,
      netAmount,
    },
  });

  return updatedSettlement;
};

const deleteSettlement = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Settlement ID is required.");
  }

  const settlement = await prisma.settlement.findUnique({
    where: { id },
  });

  if (!settlement) {
    throw new customError(status.NOT_FOUND, "Settlement record not found.");
  }

  await prisma.settlement.delete({
    where: { id },
  });

  return { message: "Settlement record deleted successfully." };
};

export const settlementService = {
  createSettlement,
  getSettlementsByGatewayId,
  getAllSettlements,
  getSettlementById,
  updateSettlementStatus,
  deleteSettlement,
};
