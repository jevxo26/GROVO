import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 11. DISTRIBUTION SCHEDULE SERVICES ====================
export const createDistributionSchedule = async (payload: any) => {
  if (!payload.distributionCampaignId || !payload.scheduleDate || !payload.startTime || !payload.endTime) {
    throw new customError(status.BAD_REQUEST, "distributionCampaignId, scheduleDate, startTime, and endTime are required.");
  }

  return await prisma.distributionSchedule.create({
    data: {
      distributionCampaignId: payload.distributionCampaignId,
      branchId: payload.branchId || null,
      distributionCenterId: payload.distributionCenterId || null,
      scheduleDate: new Date(payload.scheduleDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllDistributionSchedules = async (query?: { distributionCampaignId?: string; branchId?: string; status?: string }) => {
  const where: any = {};
  if (query?.distributionCampaignId) where.distributionCampaignId = query.distributionCampaignId;
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionSchedule.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDistributionScheduleById = async (id: string) => {
  const item = await prisma.distributionSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution schedule not found.");
  }
  return item;
};

export const updateDistributionSchedule = async (id: string, payload: any) => {
  const item = await prisma.distributionSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution schedule not found.");
  }

  return await prisma.distributionSchedule.update({
    where: { id },
    data: {
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.distributionCenterId !== undefined && { distributionCenterId: payload.distributionCenterId }),
      ...(payload.scheduleDate && { scheduleDate: new Date(payload.scheduleDate) }),
      ...(payload.startTime && { startTime: payload.startTime }),
      ...(payload.endTime && { endTime: payload.endTime }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDistributionSchedule = async (id: string) => {
  const item = await prisma.distributionSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution schedule not found.");
  }
  await prisma.distributionSchedule.delete({ where: { id } });
  return { message: "Distribution schedule deleted successfully." };
};
