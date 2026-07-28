import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 6. DONATION ANALYTICS SERVICES ====================
export const createDonationAnalytics = async (payload: any) => {
  return await prisma.donationAnalytics.create({
    data: {
      date: payload.date ? new Date(payload.date) : new Date(),
      totalDonation: payload.totalDonation ? Number(payload.totalDonation) : 0.0,
      averageDonation: payload.averageDonation ? Number(payload.averageDonation) : 0.0,
      highestDonation: payload.highestDonation ? Number(payload.highestDonation) : 0.0,
      lowestDonation: payload.lowestDonation ? Number(payload.lowestDonation) : 0.0,
      currency: payload.currency || "BDT",
    },
  });
};

export const getAllDonationAnalytics = async () => {
  return await prisma.donationAnalytics.findMany({
    orderBy: { date: "desc" },
  });
};

export const getDonationAnalyticsById = async (id: string) => {
  const item = await prisma.donationAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation analytics record not found.");
  }
  return item;
};

export const updateDonationAnalytics = async (id: string, payload: any) => {
  const item = await prisma.donationAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation analytics record not found.");
  }

  return await prisma.donationAnalytics.update({
    where: { id },
    data: {
      ...(payload.totalDonation !== undefined && { totalDonation: Number(payload.totalDonation) }),
      ...(payload.averageDonation !== undefined && { averageDonation: Number(payload.averageDonation) }),
      ...(payload.highestDonation !== undefined && { highestDonation: Number(payload.highestDonation) }),
      ...(payload.lowestDonation !== undefined && { lowestDonation: Number(payload.lowestDonation) }),
      ...(payload.currency && { currency: payload.currency }),
    },
  });
};

export const deleteDonationAnalytics = async (id: string) => {
  const item = await prisma.donationAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation analytics record not found.");
  }
  await prisma.donationAnalytics.delete({ where: { id } });
  return { message: "Donation analytics record deleted successfully." };
};
