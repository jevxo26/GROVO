import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 5. ANALYTICS SNAPSHOT SERVICES ====================
export const createAnalyticsSnapshot = async (payload: any) => {
  return await prisma.analyticsSnapshot.create({
    data: {
      snapshotDate: payload.snapshotDate ? new Date(payload.snapshotDate) : new Date(),
      totalUsers: payload.totalUsers ? Number(payload.totalUsers) : 0,
      totalMembers: payload.totalMembers ? Number(payload.totalMembers) : 0,
      totalDonors: payload.totalDonors ? Number(payload.totalDonors) : 0,
      totalVolunteers: payload.totalVolunteers ? Number(payload.totalVolunteers) : 0,
      totalCampaigns: payload.totalCampaigns ? Number(payload.totalCampaigns) : 0,
      totalProjects: payload.totalProjects ? Number(payload.totalProjects) : 0,
      totalDonations: payload.totalDonations ? Number(payload.totalDonations) : 0.0,
      totalBeneficiaries: payload.totalBeneficiaries ? Number(payload.totalBeneficiaries) : 0,
    },
  });
};

export const getAllAnalyticsSnapshots = async () => {
  return await prisma.analyticsSnapshot.findMany({
    orderBy: { snapshotDate: "desc" },
  });
};

export const getAnalyticsSnapshotById = async (id: string) => {
  const item = await prisma.analyticsSnapshot.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Analytics snapshot not found.");
  }
  return item;
};

export const updateAnalyticsSnapshot = async (id: string, payload: any) => {
  const item = await prisma.analyticsSnapshot.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Analytics snapshot not found.");
  }

  return await prisma.analyticsSnapshot.update({
    where: { id },
    data: {
      ...(payload.totalUsers !== undefined && { totalUsers: Number(payload.totalUsers) }),
      ...(payload.totalMembers !== undefined && { totalMembers: Number(payload.totalMembers) }),
      ...(payload.totalDonors !== undefined && { totalDonors: Number(payload.totalDonors) }),
      ...(payload.totalVolunteers !== undefined && { totalVolunteers: Number(payload.totalVolunteers) }),
      ...(payload.totalCampaigns !== undefined && { totalCampaigns: Number(payload.totalCampaigns) }),
      ...(payload.totalProjects !== undefined && { totalProjects: Number(payload.totalProjects) }),
      ...(payload.totalDonations !== undefined && { totalDonations: Number(payload.totalDonations) }),
      ...(payload.totalBeneficiaries !== undefined && { totalBeneficiaries: Number(payload.totalBeneficiaries) }),
    },
  });
};

export const deleteAnalyticsSnapshot = async (id: string) => {
  const item = await prisma.analyticsSnapshot.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Analytics snapshot not found.");
  }
  await prisma.analyticsSnapshot.delete({ where: { id } });
  return { message: "Analytics snapshot deleted successfully." };
};
