import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 13. MEMBERSHIP HISTORY SERVICES ====================
export const createMembershipHistory = async (payload: any) => {
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

export const getAllMembershipHistories = async (query?: { membershipId?: string; changedBy?: string }) => {
  const where: any = {};
  if (query?.membershipId) where.membershipId = query.membershipId;
  if (query?.changedBy) where.changedBy = query.changedBy;

  return await prisma.membershipHistory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getMembershipHistoryById = async (id: string) => {
  const item = await prisma.membershipHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership history record not found.");
  }
  return item;
};

export const updateMembershipHistory = async (id: string, payload: any) => {
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

export const deleteMembershipHistory = async (id: string) => {
  const item = await prisma.membershipHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership history record not found.");
  }
  await prisma.membershipHistory.delete({ where: { id } });
  return { message: "Membership history record deleted successfully." };
};
