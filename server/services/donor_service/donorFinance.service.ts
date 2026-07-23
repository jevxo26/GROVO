import status from "http-status";
import { prisma } from "../../lib/prisma";
import customError from "../../error/customError";

const createDonorSubscription = async (payload: any) =>
  prisma.donorSubscription.create({
    data: {
      donorId: payload.donorId,
      subscriptionType: payload.subscriptionType,
      amount: Number(payload.amount),
      billingCycle: payload.billingCycle,
      startDate: new Date(payload.startDate),
      nextBillingDate: new Date(payload.nextBillingDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      autoRenew:
        payload.autoRenew !== undefined ? Boolean(payload.autoRenew) : true,
      status: payload.status,
    },
  });

const createDonationCommitment = async (payload: any) => {
  const pledged = Number(payload.pledgedAmount);
  const paid = payload.paidAmount ? Number(payload.paidAmount) : 0.0;
  return prisma.donationCommitment.create({
    data: {
      donorId: payload.donorId,
      campaignId: payload.campaignId,
      pledgedAmount: pledged,
      paidAmount: paid,
      remainingAmount: pledged - paid,
      dueDate: new Date(payload.dueDate),
      status: payload.status,
    },
  });
};

const createDonorWallet = async (payload: any) => {
  const existing = await prisma.donorWallet.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) throw new customError(status.CONFLICT, "Wallet already exists");
  return prisma.donorWallet.create({
    data: {
      donorId: payload.donorId,
      balance: payload.balance ? Number(payload.balance) : 0.0,
      totalDonated: payload.totalDonated ? Number(payload.totalDonated) : 0.0,
      rewardPoints: payload.rewardPoints ? Number(payload.rewardPoints) : 0,
      status: payload.status,
    },
  });
};

const createDonorTransaction = async (payload: any) => {
  const existing = await prisma.donorTransaction.findUnique({
    where: { referenceNo: payload.referenceNo },
  });
  if (existing)
    throw new customError(
      status.CONFLICT,
      `Reference '${payload.referenceNo}' exists`,
    );
  return prisma.donorTransaction.create({
    data: {
      walletId: payload.walletId,
      transactionType: payload.transactionType,
      amount: Number(payload.amount),
      referenceNo: payload.referenceNo,
      description: payload.description,
      status: payload.status,
    },
  });
};

const createMembershipFee = async (payload: any) =>
  prisma.membershipFee.create({
    data: {
      membershipType: payload.membershipType,
      minimumAmount: Number(payload.minimumAmount),
      maximumAmount: Number(payload.maximumAmount),
      billingCycle: payload.billingCycle,
      status: payload.status,
    },
  });

const createMembershipPayment = async (payload: any) => {
  const existing = await prisma.membershipPayment.findUnique({
    where: { transactionId: payload.transactionId },
  });
  if (existing)
    throw new customError(
      status.CONFLICT,
      `Transaction ID '${payload.transactionId}' exists`,
    );
  return prisma.membershipPayment.create({
    data: {
      membershipId: payload.membershipId,
      paymentMethod: payload.paymentMethod,
      amount: Number(payload.amount),
      transactionId: payload.transactionId,
      paymentStatus: payload.paymentStatus,
      paidAt: payload.paidAt ? new Date(payload.paidAt) : undefined,
    },
  });
};

const createMembershipHistory = async (payload: any) =>
  prisma.membershipHistory.create({
    data: {
      membershipId: payload.membershipId,
      oldType: payload.oldType,
      newType: payload.newType,
      changedBy: payload.changedBy,
      reason: payload.reason,
    },
  });

export const donorFinanceService = {
  createDonorSubscription,
  createDonationCommitment,
  createDonorWallet,
  createDonorTransaction,
  createMembershipFee,
  createMembershipPayment,
  createMembershipHistory,
};
