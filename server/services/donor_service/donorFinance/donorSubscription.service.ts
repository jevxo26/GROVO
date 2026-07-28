import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 5. DONOR SUBSCRIPTION SERVICES ====================
export const createDonorSubscription = async (payload: any) => {
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

export const getAllDonorSubscriptions = async (query?: { donorId?: string; billingCycle?: string; status?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.billingCycle) where.billingCycle = query.billingCycle;
  if (query?.status) where.status = query.status;

  return await prisma.donorSubscription.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorSubscriptionById = async (id: string) => {
  const item = await prisma.donorSubscription.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor subscription not found.");
  }
  return item;
};

export const updateDonorSubscription = async (id: string, payload: any) => {
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

export const deleteDonorSubscription = async (id: string) => {
  const item = await prisma.donorSubscription.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor subscription not found.");
  }
  await prisma.donorSubscription.delete({ where: { id } });
  return { message: "Donor subscription deleted successfully." };
};
