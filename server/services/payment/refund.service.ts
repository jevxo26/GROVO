import status from "http-status";
import { PaymentStatus, RefundStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateRefundPayload {
  paymentId: string;
  refundAmount: number;
  refundReason: string;
}

export interface UpdateRefundStatusPayload {
  refundStatus: RefundStatus;
}

const createRefundRequest = async (payload: CreateRefundPayload) => {
  if (!payload.paymentId || !payload.refundAmount || payload.refundAmount <= 0 || !payload.refundReason) {
    throw new customError(status.BAD_REQUEST, "Required fields: paymentId, refundAmount > 0, and refundReason.");
  }

  const payment = await prisma.payment.findUnique({
    where: { id: payload.paymentId },
  });

  if (!payment) {
    throw new customError(status.NOT_FOUND, "Payment record not found.");
  }

  if (payload.refundAmount > payment.amount) {
    throw new customError(status.BAD_REQUEST, "Refund amount cannot exceed total payment amount.");
  }

  const refund = await prisma.refund.create({
    data: {
      paymentId: payload.paymentId,
      refundAmount: payload.refundAmount,
      refundReason: payload.refundReason,
      refundStatus: RefundStatus.PENDING,
    },
    include: {
      payment: { select: { id: true, donationId: true, amount: true, transactionId: true } },
    },
  });

  return refund;
};

const getRefundsByPaymentId = async (paymentId: string) => {
  if (!paymentId) {
    throw new customError(status.BAD_REQUEST, "Payment ID is required.");
  }

  const refunds = await prisma.refund.findMany({
    where: { paymentId },
    orderBy: { createdAt: "desc" },
    include: {
      processor: { select: { id: true, fullName: true, email: true } },
    },
  });

  return refunds;
};

const getAllRefunds = async (query?: {
  refundStatus?: RefundStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.refundStatus) {
    where.refundStatus = query.refundStatus;
  }

  if (query?.search) {
    where.OR = [
      { refundReason: { contains: query.search, mode: "insensitive" } },
      { payment: { transactionId: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [refunds, total, totalProcessedSum] = await Promise.all([
    prisma.refund.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        payment: { select: { id: true, donationId: true, transactionId: true, amount: true } },
        processor: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.refund.count({ where }),
    prisma.refund.aggregate({
      where: { ...where, refundStatus: RefundStatus.PROCESSED },
      _sum: { refundAmount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalProcessedRefundAmount: totalProcessedSum._sum.refundAmount || 0,
    },
    data: refunds,
  };
};

const getRefundById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Refund ID is required.");
  }

  const refund = await prisma.refund.findUnique({
    where: { id },
    include: {
      payment: {
        include: {
          donation: {
            select: { id: true, donationNumber: true, donorId: true, campaignId: true },
          },
        },
      },
      processor: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!refund) {
    throw new customError(status.NOT_FOUND, "Refund record not found.");
  }

  return refund;
};

const updateRefundStatus = async (
  processorUserId: string | undefined,
  id: string,
  payload: UpdateRefundStatusPayload
) => {
  if (!id || !payload.refundStatus) {
    throw new customError(status.BAD_REQUEST, "Refund ID and refundStatus are required.");
  }

  const refund = await prisma.refund.findUnique({
    where: { id },
    include: { payment: { include: { donation: true } } },
  });

  if (!refund) {
    throw new customError(status.NOT_FOUND, "Refund record not found.");
  }

  const oldStatus = refund.refundStatus;
  const newStatus = payload.refundStatus;
  const processedAt = (newStatus === RefundStatus.PROCESSED || newStatus === RefundStatus.APPROVED)
    ? new Date()
    : null;

  const result = await prisma.$transaction(async (tx) => {
    const updatedRefund = await tx.refund.update({
      where: { id },
      data: {
        refundStatus: newStatus,
        processedBy: processorUserId || null,
        processedAt,
      },
    });

    // If refund transitions to PROCESSED, update payment status and adjust campaign balances if full refund
    if (oldStatus !== RefundStatus.PROCESSED && newStatus === RefundStatus.PROCESSED) {
      if (refund.refundAmount >= refund.payment.amount) {
        await tx.payment.update({
          where: { id: refund.paymentId },
          data: { paymentStatus: PaymentStatus.FAILED },
        });

        await tx.donation.update({
          where: { id: refund.payment.donationId },
          data: { paymentStatus: PaymentStatus.FAILED },
        });

        if (refund.payment.donation.campaignId) {
          await tx.campaign.update({
            where: { id: refund.payment.donation.campaignId },
            data: { raisedAmount: { decrement: refund.refundAmount } },
          });

          const emergency = await tx.emergencyCampaign.findUnique({
            where: { campaignId: refund.payment.donation.campaignId },
          });
          if (emergency) {
            await tx.emergencyCampaign.update({
              where: { campaignId: refund.payment.donation.campaignId },
              data: { currentAmount: { decrement: refund.refundAmount } },
            });
          }
        }
      }
    }

    return updatedRefund;
  });

  return result;
};

const deleteRefund = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Refund ID is required.");
  }

  const refund = await prisma.refund.findUnique({
    where: { id },
  });

  if (!refund) {
    throw new customError(status.NOT_FOUND, "Refund record not found.");
  }

  if (refund.refundStatus === RefundStatus.PROCESSED) {
    throw new customError(status.BAD_REQUEST, "Cannot delete a processed refund record.");
  }

  await prisma.refund.delete({
    where: { id },
  });

  return { message: "Refund record deleted successfully." };
};

export const refundService = {
  createRefundRequest,
  getRefundsByPaymentId,
  getAllRefunds,
  getRefundById,
  updateRefundStatus,
  deleteRefund,
};
