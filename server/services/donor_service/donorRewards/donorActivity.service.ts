import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 16. DONOR ACTIVITY SERVICES ====================
export const createDonorActivity = async (payload: any) => {
  if (!payload.donorId || !payload.activityType || !payload.description) {
    throw new customError(status.BAD_REQUEST, "donorId, activityType, and description are required.");
  }

  return await prisma.donorActivity.create({
    data: {
      donorId: payload.donorId,
      activityType: payload.activityType,
      description: payload.description,
      performedAt: payload.performedAt
        ? new Date(payload.performedAt)
        : new Date(),
    },
  });
};

export const getAllDonorActivities = async (query?: { donorId?: string; activityType?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.activityType) where.activityType = query.activityType;

  return await prisma.donorActivity.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorActivityById = async (id: string) => {
  const item = await prisma.donorActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor activity record not found.");
  }
  return item;
};

export const deleteDonorActivity = async (id: string) => {
  const item = await prisma.donorActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor activity record not found.");
  }
  await prisma.donorActivity.delete({ where: { id } });
  return { message: "Donor activity record deleted successfully." };
};
