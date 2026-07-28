import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

export const updateMembershipPayment = async (id: string, payload: any) => {
  const item = await prisma.membershipPayment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership payment record not found.");
  }

  if (payload.transactionId && payload.transactionId !== item.transactionId) {
    const existing = await prisma.membershipPayment.findUnique({ where: { transactionId: payload.transactionId } });
    if (existing) {
      throw new customError(status.CONFLICT, `Transaction ID '${payload.transactionId}' already exists`);
    }
  }

  return await prisma.membershipPayment.update({
    where: { id },
    data: {
      ...(payload.paymentMethod && { paymentMethod: payload.paymentMethod }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.transactionId && { transactionId: payload.transactionId }),
      ...(payload.paymentStatus && { paymentStatus: payload.paymentStatus }),
      ...(payload.paidAt && { paidAt: new Date(payload.paidAt) }),
    },
  });
};

export const deleteMembershipPayment = async (id: string) => {
  const item = await prisma.membershipPayment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership payment record not found.");
  }
  await prisma.membershipPayment.delete({ where: { id } });
  return { message: "Membership payment record deleted successfully." };
};
