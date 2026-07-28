import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 14. LIVE DONATION FEED SERVICES ====================
export const createLiveDonationFeed = async (payload: any) => {
  if (!payload.donorName || payload.amount === undefined || !payload.campaignId) {
    throw new customError(status.BAD_REQUEST, "donorName, amount, and campaignId are required.");
  }

  return await prisma.liveDonationFeed.create({
    data: {
      donorId: payload.donorId || null,
      donorName: payload.donorName,
      amount: Number(payload.amount),
      campaignId: payload.campaignId,
      message: payload.message || null,
      isAnonymous: payload.isAnonymous !== undefined ? Boolean(payload.isAnonymous) : false,
      displayStatus: payload.displayStatus || "VISIBLE",
    },
  });
};

export const getAllLiveDonationFeeds = async (query?: { campaignId?: string; displayStatus?: string }) => {
  const where: any = {};
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.displayStatus) where.displayStatus = query.displayStatus;

  return await prisma.liveDonationFeed.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getLiveDonationFeedById = async (id: string) => {
  const item = await prisma.liveDonationFeed.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Live donation feed record not found.");
  }
  return item;
};

export const updateLiveDonationFeed = async (id: string, payload: any) => {
  const item = await prisma.liveDonationFeed.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Live donation feed record not found.");
  }

  return await prisma.liveDonationFeed.update({
    where: { id },
    data: {
      ...(payload.donorName && { donorName: payload.donorName }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.message !== undefined && { message: payload.message }),
      ...(payload.isAnonymous !== undefined && { isAnonymous: Boolean(payload.isAnonymous) }),
      ...(payload.displayStatus && { displayStatus: payload.displayStatus }),
    },
  });
};

export const deleteLiveDonationFeed = async (id: string) => {
  const item = await prisma.liveDonationFeed.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Live donation feed record not found.");
  }
  await prisma.liveDonationFeed.delete({ where: { id } });
  return { message: "Live donation feed record deleted successfully." };
};
