import { prisma } from "../lib/prisma";

const transferCapital = async (payload: {
  fromFundId: string;
  toFundId: string;
  amount: number;
  reason?: string;
  approvedBy?: string;
}) => {
  return await prisma.$transaction(async (tx) => {
    const source = await tx.fund.update({
      where: { id: payload.fromFundId },
      data: { currentBalance: { decrement: payload.amount } },
    });

    if (source.currentBalance < 0) {
      throw new Error("INSUFFICIENT_FUND_LIQUIDITY");
    }

    await tx.fund.update({
      where: { id: payload.toFundId },
      data: { currentBalance: { increment: payload.amount } },
    });

    return await tx.fundTransfer.create({
      data: {
        fromFundId: payload.fromFundId,
        toFundId: payload.toFundId,
        amount: payload.amount,
        reason: payload.reason,
        approvedBy: payload.approvedBy,
      },
    });
  });
};

const verifyTransaction = async (payload: {
  paymentId: string;
  gatewayTxId: string;
  status: string;
  amount: number;
}) => {
  const txRecord = await prisma.paymentTransaction.create({
    data: {
      paymentId: payload.paymentId,
      gatewayTransactionId: payload.gatewayTxId,
      amount: payload.amount,
      status: payload.status,
    },
  });

  await prisma.payment.update({
    where: { id: payload.paymentId },
    data: {
      paymentStatus: payload.status,
      paidAt: payload.status === "SUCCESS" ? new Date() : null,
    },
  });

  return txRecord;
};

export const financialService = {
  transferCapital,
  verifyTransaction,
};
