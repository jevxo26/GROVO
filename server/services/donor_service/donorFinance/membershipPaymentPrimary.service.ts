import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 12. MEMBERSHIP PAYMENT SERVICES ====================
export const createMembershipPayment = async (payload: any) => {
  if (!payload.membershipId || !payload.paymentMethod || payload.amount === undefined || !payload.transactionId) {
    throw new customError(status.BAD_REQUEST, "membershipId, paymentMethod, amount, and transactionId are required.");
  }

  const existing = await prisma.membershipPayment.findUnique({
    where: { transactionId: payload.transactionId },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Transaction ID '${payload.transactionId}' already exists`
    );
  }

  return await prisma.membershipPayment.create({
    data: {
      membershipId: payload.membershipId,
      paymentMethod: payload.paymentMethod,
      amount: Number(payload.amount),
      transactionId: payload.transactionId,
      paymentStatus: payload.paymentStatus || "ACTIVE",
      paidAt: payload.paidAt ? new Date(payload.paidAt) : new Date(),
    },
  });
};

export const getAllMembershipPayments = async (query?: { membershipId?: string; paymentStatus?: string }) => {
  const where: any = {};
  if (query?.membershipId) where.membershipId = query.membershipId;
  if (query?.paymentStatus) where.paymentStatus = query.paymentStatus;

  return await prisma.membershipPayment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getMembershipPaymentById = async (id: string) => {
  const item = await prisma.membershipPayment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership payment record not found.");
  }
  return item;
};

