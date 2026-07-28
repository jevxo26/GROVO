import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 13. MEMBERSHIP ANALYTICS SERVICES ====================
export const createMembershipAnalytics = async (payload: any) => {
  if (!payload.membershipType) {
    throw new customError(status.BAD_REQUEST, "membershipType is required.");
  }

  return await prisma.membershipAnalytics.create({
    data: {
      membershipType: payload.membershipType,
      totalMembers: payload.totalMembers ? Number(payload.totalMembers) : 0,
      newMembers: payload.newMembers ? Number(payload.newMembers) : 0,
      renewals: payload.renewals ? Number(payload.renewals) : 0,
      expiredMemberships: payload.expiredMemberships ? Number(payload.expiredMemberships) : 0,
    },
  });
};

export const getAllMembershipAnalytics = async () => {
  return await prisma.membershipAnalytics.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getMembershipAnalyticsById = async (id: string) => {
  const item = await prisma.membershipAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership analytics record not found.");
  }
  return item;
};

export const updateMembershipAnalytics = async (id: string, payload: any) => {
  const item = await prisma.membershipAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership analytics record not found.");
  }

  return await prisma.membershipAnalytics.update({
    where: { id },
    data: {
      ...(payload.membershipType && { membershipType: payload.membershipType }),
      ...(payload.totalMembers !== undefined && { totalMembers: Number(payload.totalMembers) }),
      ...(payload.newMembers !== undefined && { newMembers: Number(payload.newMembers) }),
      ...(payload.renewals !== undefined && { renewals: Number(payload.renewals) }),
      ...(payload.expiredMemberships !== undefined && { expiredMemberships: Number(payload.expiredMemberships) }),
    },
  });
};

export const deleteMembershipAnalytics = async (id: string) => {
  const item = await prisma.membershipAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership analytics record not found.");
  }
  await prisma.membershipAnalytics.delete({ where: { id } });
  return { message: "Membership analytics record deleted successfully." };
};
