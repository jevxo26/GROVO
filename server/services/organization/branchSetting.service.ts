import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface SaveBranchSettingPayload {
  branchId: string;
  currency?: string;
  timezone?: string;
  workingHours?: string;
  holidayPolicy?: string;
  status?: string;
}

const createOrUpdateBranchSetting = async (payload: SaveBranchSettingPayload) => {
  if (!payload.branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const branch = await prisma.branch.findUnique({
    where: { id: payload.branchId },
  });

  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch record not found.");
  }

  const setting = await prisma.branchSetting.upsert({
    where: { branchId: payload.branchId },
    update: {
      ...(payload.currency !== undefined && { currency: payload.currency }),
      ...(payload.timezone !== undefined && { timezone: payload.timezone }),
      ...(payload.workingHours !== undefined && { workingHours: payload.workingHours }),
      ...(payload.holidayPolicy !== undefined && { holidayPolicy: payload.holidayPolicy }),
      ...(payload.status !== undefined && { status: payload.status }),
    },
    create: {
      branchId: payload.branchId,
      currency: payload.currency || "BDT",
      timezone: payload.timezone || "Asia/Dhaka",
      workingHours: payload.workingHours || null,
      holidayPolicy: payload.holidayPolicy || null,
      status: payload.status || "ACTIVE",
    },
  });

  return setting;
};

const getBranchSettingByBranchId = async (branchId: string) => {
  if (!branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const setting = await prisma.branchSetting.findUnique({
    where: { branchId },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  if (!setting) {
    throw new customError(status.NOT_FOUND, "Settings not found for this branch.");
  }

  return setting;
};

const deleteBranchSetting = async (branchId: string) => {
  if (!branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const setting = await prisma.branchSetting.findUnique({
    where: { branchId },
  });

  if (!setting) {
    throw new customError(status.NOT_FOUND, "Settings not found for this branch.");
  }

  await prisma.branchSetting.delete({
    where: { branchId },
  });

  return { message: "Branch settings deleted successfully." };
};

export const branchSettingService = {
  createOrUpdateBranchSetting,
  getBranchSettingByBranchId,
  deleteBranchSetting,
};
