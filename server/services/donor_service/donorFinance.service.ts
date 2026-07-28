import status from "http-status";
import { prisma } from "../../lib/prisma";
import customError from "../../error/customError";

// ==================== 5. DONOR SUBSCRIPTION SERVICES ====================
const createDonorSubscription = async (payload: any) => {
  if (!payload.donorId || !payload.subscriptionType || payload.amount === undefined || !payload.startDate || !payload.nextBillingDate) {
    throw new customError(status.BAD_REQUEST, "donorId, subscriptionType, amount, startDate, and nextBillingDate are required.");
  }

  return await prisma.donorSubscription.create({
    data: {
      donorId: payload.donorId,
      subscriptionType: payload.subscriptionType,
      amount: Number(payload.amount),
      billingCycle: payload.billingCycle || "MONTHLY",
      startDate: new Date(payload.startDate),
      nextBillingDate: new Date(payload.nextBillingDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      autoRenew: payload.autoRenew !== undefined ? Boolean(payload.autoRenew) : true,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDonorSubscriptions = async (query?: { donorId?: string; billingCycle?: string; status?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.billingCycle) where.billingCycle = query.billingCycle;
  if (query?.status) where.status = query.status;

  return await prisma.donorSubscription.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorSubscriptionById = async (id: string) => {
  const item = await prisma.donorSubscription.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor subscription not found.");
  }
  return item;
};

const updateDonorSubscription = async (id: string, payload: any) => {
  const item = await prisma.donorSubscription.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor subscription not found.");
  }

  return await prisma.donorSubscription.update({
    where: { id },
    data: {
      ...(payload.subscriptionType && { subscriptionType: payload.subscriptionType }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.billingCycle && { billingCycle: payload.billingCycle }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.nextBillingDate && { nextBillingDate: new Date(payload.nextBillingDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.autoRenew !== undefined && { autoRenew: Boolean(payload.autoRenew) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDonorSubscription = async (id: string) => {
  const item = await prisma.donorSubscription.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor subscription not found.");
  }
  await prisma.donorSubscription.delete({ where: { id } });
  return { message: "Donor subscription deleted successfully." };
};


// ==================== 6. DONATION COMMITMENT SERVICES ====================
const createDonationCommitment = async (payload: any) => {
  if (!payload.donorId || !payload.campaignId || payload.pledgedAmount === undefined || !payload.dueDate) {
    throw new customError(status.BAD_REQUEST, "donorId, campaignId, pledgedAmount, and dueDate are required.");
  }

  const pledged = Number(payload.pledgedAmount);
  const paid = payload.paidAmount ? Number(payload.paidAmount) : 0.0;

  return await prisma.donationCommitment.create({
    data: {
      donorId: payload.donorId,
      campaignId: payload.campaignId,
      pledgedAmount: pledged,
      paidAmount: paid,
      remainingAmount: pledged - paid,
      dueDate: new Date(payload.dueDate),
      status: payload.status || "PENDING",
    },
  });
};

const getAllDonationCommitments = async (query?: { donorId?: string; campaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.status) where.status = query.status;

  return await prisma.donationCommitment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonationCommitmentById = async (id: string) => {
  const item = await prisma.donationCommitment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation commitment not found.");
  }
  return item;
};

const updateDonationCommitment = async (id: string, payload: any) => {
  const item = await prisma.donationCommitment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation commitment not found.");
  }

  const pledged = payload.pledgedAmount !== undefined ? Number(payload.pledgedAmount) : item.pledgedAmount;
  const paid = payload.paidAmount !== undefined ? Number(payload.paidAmount) : item.paidAmount;

  return await prisma.donationCommitment.update({
    where: { id },
    data: {
      ...(payload.campaignId && { campaignId: payload.campaignId }),
      pledgedAmount: pledged,
      paidAmount: paid,
      remainingAmount: pledged - paid,
      ...(payload.dueDate && { dueDate: new Date(payload.dueDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDonationCommitment = async (id: string) => {
  const item = await prisma.donationCommitment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation commitment not found.");
  }
  await prisma.donationCommitment.delete({ where: { id } });
  return { message: "Donation commitment deleted successfully." };
};


// ==================== 7. DONOR WALLET SERVICES ====================
const createDonorWallet = async (payload: any) => {
  if (!payload.donorId) {
    throw new customError(status.BAD_REQUEST, "donorId is required.");
  }

  const existing = await prisma.donorWallet.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Wallet already exists for this donor.");
  }

  return await prisma.donorWallet.create({
    data: {
      donorId: payload.donorId,
      balance: payload.balance ? Number(payload.balance) : 0.0,
      totalDonated: payload.totalDonated ? Number(payload.totalDonated) : 0.0,
      rewardPoints: payload.rewardPoints ? Number(payload.rewardPoints) : 0,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDonorWallets = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.donorWallet.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorWalletById = async (id: string) => {
  const item = await prisma.donorWallet.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor wallet not found.");
  }
  return item;
};

const updateDonorWallet = async (id: string, payload: any) => {
  const item = await prisma.donorWallet.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor wallet not found.");
  }

  return await prisma.donorWallet.update({
    where: { id },
    data: {
      ...(payload.balance !== undefined && { balance: Number(payload.balance) }),
      ...(payload.totalDonated !== undefined && { totalDonated: Number(payload.totalDonated) }),
      ...(payload.rewardPoints !== undefined && { rewardPoints: Number(payload.rewardPoints) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDonorWallet = async (id: string) => {
  const item = await prisma.donorWallet.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor wallet not found.");
  }
  await prisma.donorWallet.delete({ where: { id } });
  return { message: "Donor wallet deleted successfully." };
};


// ==================== 8. DONOR TRANSACTION SERVICES ====================
const createDonorTransaction = async (payload: any) => {
  if (!payload.walletId || !payload.transactionType || payload.amount === undefined || !payload.referenceNo) {
    throw new customError(status.BAD_REQUEST, "walletId, transactionType, amount, and referenceNo are required.");
  }

  const existing = await prisma.donorTransaction.findUnique({
    where: { referenceNo: payload.referenceNo },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Reference number '${payload.referenceNo}' already exists`
    );
  }

  return await prisma.donorTransaction.create({
    data: {
      walletId: payload.walletId,
      transactionType: payload.transactionType,
      amount: Number(payload.amount),
      referenceNo: payload.referenceNo,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDonorTransactions = async (query?: { walletId?: string; transactionType?: string; status?: string }) => {
  const where: any = {};
  if (query?.walletId) where.walletId = query.walletId;
  if (query?.transactionType) where.transactionType = query.transactionType;
  if (query?.status) where.status = query.status;

  return await prisma.donorTransaction.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorTransactionById = async (id: string) => {
  const item = await prisma.donorTransaction.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor transaction not found.");
  }
  return item;
};

const updateDonorTransaction = async (id: string, payload: any) => {
  const item = await prisma.donorTransaction.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor transaction not found.");
  }

  if (payload.referenceNo && payload.referenceNo !== item.referenceNo) {
    const existing = await prisma.donorTransaction.findUnique({ where: { referenceNo: payload.referenceNo } });
    if (existing) {
      throw new customError(status.CONFLICT, `Reference number '${payload.referenceNo}' already exists`);
    }
  }

  return await prisma.donorTransaction.update({
    where: { id },
    data: {
      ...(payload.transactionType && { transactionType: payload.transactionType }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.referenceNo && { referenceNo: payload.referenceNo }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDonorTransaction = async (id: string) => {
  const item = await prisma.donorTransaction.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor transaction not found.");
  }
  await prisma.donorTransaction.delete({ where: { id } });
  return { message: "Donor transaction deleted successfully." };
};


// ==================== 11. MEMBERSHIP FEE SERVICES ====================
const createMembershipFee = async (payload: any) => {
  if (!payload.membershipType || payload.minimumAmount === undefined || payload.maximumAmount === undefined) {
    throw new customError(status.BAD_REQUEST, "membershipType, minimumAmount, and maximumAmount are required.");
  }

  return await prisma.membershipFee.create({
    data: {
      membershipType: payload.membershipType,
      minimumAmount: Number(payload.minimumAmount),
      maximumAmount: Number(payload.maximumAmount),
      billingCycle: payload.billingCycle || "YEARLY",
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllMembershipFees = async (query?: { membershipType?: string; status?: string }) => {
  const where: any = {};
  if (query?.membershipType) where.membershipType = query.membershipType;
  if (query?.status) where.status = query.status;

  return await prisma.membershipFee.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getMembershipFeeById = async (id: string) => {
  const item = await prisma.membershipFee.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership fee structure not found.");
  }
  return item;
};

const updateMembershipFee = async (id: string, payload: any) => {
  const item = await prisma.membershipFee.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership fee structure not found.");
  }

  return await prisma.membershipFee.update({
    where: { id },
    data: {
      ...(payload.membershipType && { membershipType: payload.membershipType }),
      ...(payload.minimumAmount !== undefined && { minimumAmount: Number(payload.minimumAmount) }),
      ...(payload.maximumAmount !== undefined && { maximumAmount: Number(payload.maximumAmount) }),
      ...(payload.billingCycle && { billingCycle: payload.billingCycle }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteMembershipFee = async (id: string) => {
  const item = await prisma.membershipFee.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership fee structure not found.");
  }
  await prisma.membershipFee.delete({ where: { id } });
  return { message: "Membership fee structure deleted successfully." };
};


// ==================== 12. MEMBERSHIP PAYMENT SERVICES ====================
const createMembershipPayment = async (payload: any) => {
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

const getAllMembershipPayments = async (query?: { membershipId?: string; paymentStatus?: string }) => {
  const where: any = {};
  if (query?.membershipId) where.membershipId = query.membershipId;
  if (query?.paymentStatus) where.paymentStatus = query.paymentStatus;

  return await prisma.membershipPayment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getMembershipPaymentById = async (id: string) => {
  const item = await prisma.membershipPayment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership payment record not found.");
  }
  return item;
};

const updateMembershipPayment = async (id: string, payload: any) => {
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

const deleteMembershipPayment = async (id: string) => {
  const item = await prisma.membershipPayment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership payment record not found.");
  }
  await prisma.membershipPayment.delete({ where: { id } });
  return { message: "Membership payment record deleted successfully." };
};


// ==================== 13. MEMBERSHIP HISTORY SERVICES ====================
const createMembershipHistory = async (payload: any) => {
  if (!payload.membershipId || !payload.newType || !payload.changedBy) {
    throw new customError(status.BAD_REQUEST, "membershipId, newType, and changedBy are required.");
  }

  return await prisma.membershipHistory.create({
    data: {
      membershipId: payload.membershipId,
      oldType: payload.oldType || null,
      newType: payload.newType,
      changedBy: payload.changedBy,
      reason: payload.reason || null,
    },
  });
};

const getAllMembershipHistories = async (query?: { membershipId?: string; changedBy?: string }) => {
  const where: any = {};
  if (query?.membershipId) where.membershipId = query.membershipId;
  if (query?.changedBy) where.changedBy = query.changedBy;

  return await prisma.membershipHistory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getMembershipHistoryById = async (id: string) => {
  const item = await prisma.membershipHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership history record not found.");
  }
  return item;
};

const updateMembershipHistory = async (id: string, payload: any) => {
  const item = await prisma.membershipHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership history record not found.");
  }

  return await prisma.membershipHistory.update({
    where: { id },
    data: {
      ...(payload.oldType !== undefined && { oldType: payload.oldType }),
      ...(payload.newType && { newType: payload.newType }),
      ...(payload.changedBy && { changedBy: payload.changedBy }),
      ...(payload.reason !== undefined && { reason: payload.reason }),
    },
  });
};

const deleteMembershipHistory = async (id: string) => {
  const item = await prisma.membershipHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership history record not found.");
  }
  await prisma.membershipHistory.delete({ where: { id } });
  return { message: "Membership history record deleted successfully." };
};


export const donorFinanceService = {
  // DonorSubscription
  createDonorSubscription,
  getAllDonorSubscriptions,
  getDonorSubscriptionById,
  updateDonorSubscription,
  deleteDonorSubscription,
  // DonationCommitment
  createDonationCommitment,
  getAllDonationCommitments,
  getDonationCommitmentById,
  updateDonationCommitment,
  deleteDonationCommitment,
  // DonorWallet
  createDonorWallet,
  getAllDonorWallets,
  getDonorWalletById,
  updateDonorWallet,
  deleteDonorWallet,
  // DonorTransaction
  createDonorTransaction,
  getAllDonorTransactions,
  getDonorTransactionById,
  updateDonorTransaction,
  deleteDonorTransaction,
  // MembershipFee
  createMembershipFee,
  getAllMembershipFees,
  getMembershipFeeById,
  updateMembershipFee,
  deleteMembershipFee,
  // MembershipPayment
  createMembershipPayment,
  getAllMembershipPayments,
  getMembershipPaymentById,
  updateMembershipPayment,
  deleteMembershipPayment,
  // MembershipHistory
  createMembershipHistory,
  getAllMembershipHistories,
  getMembershipHistoryById,
  updateMembershipHistory,
  deleteMembershipHistory,
};
