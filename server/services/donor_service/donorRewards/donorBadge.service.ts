import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 10. DONOR BADGE SERVICES ====================
export const createDonorBadge = async (payload: any) => {
  if (!payload.donorId || !payload.badgeName || !payload.badgeLevel) {
    throw new customError(status.BAD_REQUEST, "donorId, badgeName, and badgeLevel are required.");
  }

  return await prisma.donorBadge.create({
    data: {
      donorId: payload.donorId,
      badgeName: payload.badgeName,
      badgeLevel: payload.badgeLevel,
      earnedAt: payload.earnedAt ? new Date(payload.earnedAt) : new Date(),
    },
  });
};

export const getAllDonorBadges = async (query?: { donorId?: string; badgeLevel?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.badgeLevel) where.badgeLevel = query.badgeLevel;

  return await prisma.donorBadge.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorBadgeById = async (id: string) => {
  const item = await prisma.donorBadge.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor badge not found.");
  }
  return item;
};

export const updateDonorBadge = async (id: string, payload: any) => {
  const item = await prisma.donorBadge.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor badge not found.");
  }

  return await prisma.donorBadge.update({
    where: { id },
    data: {
      ...(payload.badgeName && { badgeName: payload.badgeName }),
      ...(payload.badgeLevel && { badgeLevel: payload.badgeLevel }),
      ...(payload.earnedAt && { earnedAt: new Date(payload.earnedAt) }),
    },
  });
};

export const deleteDonorBadge = async (id: string) => {
  const item = await prisma.donorBadge.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor badge not found.");
  }
  await prisma.donorBadge.delete({ where: { id } });
  return { message: "Donor badge deleted successfully." };
};
