import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface InitiatePaymentPayload {
  donationId: string;
  paymentMethod: string;
  paymentGatewayId?: string;
  amount: number;
  currency?: string;
  transactionId?: string;
}

export interface UpdatePaymentStatusPayload {
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paidAt?: string | Date;
}

const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN-${timestamp}-${randomStr}`;
};

const initiatePayment = async (payload: InitiatePaymentPayload) => {
  if (!payload.donationId || !payload.paymentMethod || !payload.amount || payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Required fields: donationId, paymentMethod, and amount > 0.");
  }

  const donation = await prisma.donation.findUnique({
    where: { id: payload.donationId },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  if (payload.paymentGatewayId) {
    const gateway = await prisma.paymentGateway.findUnique({
      where: { id: payload.paymentGatewayId },
    });
    if (!gateway) {
      throw new customError(status.NOT_FOUND, "Payment gateway not found.");
    }
  }

  const transactionId = payload.transactionId || generateTransactionId();

  const payment = await prisma.payment.create({
    data: {
      donationId: payload.donationId,
      paymentMethod: payload.paymentMethod,
      paymentGatewayId: payload.paymentGatewayId || null,
      amount: payload.amount,
      currency: payload.currency || donation.currency || "BDT",
      transactionId,
      paymentStatus: PaymentStatus.PENDING,
    },
    include: {
      donation: { select: { id: true, donationNumber: true, isAnonymous: true } },
      paymentGateway: { select: { id: true, gatewayName: true, environment: true } },
    },
  });

  return payment;
};

const getPaymentsByDonationId = async (donationId: string) => {
  if (!donationId) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const payments = await prisma.payment.findMany({
    where: { donationId },
    orderBy: { createdAt: "desc" },
    include: {
      paymentGateway: { select: { id: true, gatewayName: true } },
      transactions: true,
      refunds: true,
    },
  });

  return payments;
};

const getAllPayments = async (query?: {
  paymentMethod?: string;
  paymentGatewayId?: string;
  paymentStatus?: PaymentStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.paymentMethod) {
    where.paymentMethod = query.paymentMethod;
  }

  if (query?.paymentGatewayId) {
    where.paymentGatewayId = query.paymentGatewayId;
  }

  if (query?.paymentStatus) {
    where.paymentStatus = query.paymentStatus;
  }

  if (query?.search) {
    where.OR = [
      { transactionId: { contains: query.search, mode: "insensitive" } },
      { donation: { donationNumber: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [payments, total, totalPaidSum] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donation: { select: { id: true, donationNumber: true, donorId: true, isAnonymous: true } },
        paymentGateway: { select: { id: true, gatewayName: true } },
      },
    }),
    prisma.payment.count({ where }),
    prisma.payment.aggregate({
      where: { ...where, paymentStatus: PaymentStatus.PAID },
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalSuccessfulPaymentsAmount: totalPaidSum._sum.amount || 0,
    },
    data: payments,
  };
};

const getPaymentById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Payment ID is required.");
  }

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      donation: {
        include: {
          donor: { select: { id: true, fullName: true, email: true } },
          campaign: { select: { id: true, title: true } },
          project: { select: { id: true, projectName: true } },
        },
      },
      paymentGateway: true,
      transactions: { orderBy: { createdAt: "desc" } },
      webhooks: { orderBy: { createdAt: "desc" } },
      refunds: true,
      paymentLogs: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!payment) {
    throw new customError(status.NOT_FOUND, "Payment record not found.");
  }

  return payment;
};

const getPaymentByTransactionId = async (transactionId: string) => {
  if (!transactionId) {
    throw new customError(status.BAD_REQUEST, "Transaction ID is required.");
  }

  const payment = await prisma.payment.findUnique({
    where: { transactionId },
    include: {
      donation: { select: { id: true, donationNumber: true, amount: true } },
      paymentGateway: { select: { id: true, gatewayName: true } },
      transactions: true,
    },
  });

  if (!payment) {
    throw new customError(status.NOT_FOUND, "Payment record not found for transaction ID.");
  }

  return payment;
};

const updatePaymentStatus = async (id: string, payload: UpdatePaymentStatusPayload) => {
  if (!id || !payload.paymentStatus) {
    throw new customError(status.BAD_REQUEST, "Payment ID and paymentStatus are required.");
  }

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { donation: true },
  });

  if (!payment) {
    throw new customError(status.NOT_FOUND, "Payment record not found.");
  }

  const oldStatus = payment.paymentStatus;
  const newStatus = payload.paymentStatus;
  const paidAt = newStatus === PaymentStatus.PAID
    ? (payload.paidAt ? new Date(payload.paidAt) : new Date())
    : null;

  const result = await prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.payment.update({
      where: { id },
      data: {
        paymentStatus: newStatus,
        ...(payload.transactionId && { transactionId: payload.transactionId }),
        paidAt,
      },
      include: {
        donation: true,
      },
    });

    // Sync parent donation payment status
    await tx.donation.update({
      where: { id: payment.donationId },
      data: {
        paymentStatus: newStatus,
      },
    });

    // If transitioning to PAID, increment campaign / emergency campaign raised balances
    if (oldStatus !== PaymentStatus.PAID && newStatus === PaymentStatus.PAID) {
      if (payment.donation.campaignId) {
        await tx.campaign.update({
          where: { id: payment.donation.campaignId },
          data: { raisedAmount: { increment: payment.amount } },
        });

        const emergency = await tx.emergencyCampaign.findUnique({ where: { campaignId: payment.donation.campaignId } });
        if (emergency) {
          await tx.emergencyCampaign.update({
            where: { campaignId: payment.donation.campaignId },
            data: { currentAmount: { increment: payment.amount } },
          });
        }
      }
    } else if (oldStatus === PaymentStatus.PAID && newStatus !== PaymentStatus.PAID) {
      if (payment.donation.campaignId) {
        await tx.campaign.update({
          where: { id: payment.donation.campaignId },
          data: { raisedAmount: { decrement: payment.amount } },
        });

        const emergency = await tx.emergencyCampaign.findUnique({ where: { campaignId: payment.donation.campaignId } });
        if (emergency) {
          await tx.emergencyCampaign.update({
            where: { campaignId: payment.donation.campaignId },
            data: { currentAmount: { decrement: payment.amount } },
          });
        }
      }
    }

    return updatedPayment;
  });

  return result;
};

const deletePayment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Payment ID is required.");
  }

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { _count: { select: { refunds: true, transactions: true } } },
  });

  if (!payment) {
    throw new customError(status.NOT_FOUND, "Payment record not found.");
  }

  if (payment._count.refunds > 0 || payment._count.transactions > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete payment with linked refunds or transaction audit logs."
    );
  }

  await prisma.payment.delete({
    where: { id },
  });

  return { message: "Payment record deleted successfully." };
};

export const paymentService = {
  initiatePayment,
  getPaymentsByDonationId,
  getAllPayments,
  getPaymentById,
  getPaymentByTransactionId,
  updatePaymentStatus,
  deletePayment,
};
