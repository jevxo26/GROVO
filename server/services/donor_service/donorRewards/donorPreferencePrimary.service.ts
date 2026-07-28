import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 17. DONOR PREFERENCE SERVICES ====================
export const createDonorPreference = async (payload: any) => {
  if (!payload.donorId) {
    throw new customError(status.BAD_REQUEST, "donorId is required.");
  }

  const existing = await prisma.donorPreference.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Preferences already exist for this donor.");
  }

  return await prisma.donorPreference.create({
    data: {
      donorId: payload.donorId,
      preferredCategory: payload.preferredCategory || null,
      preferredCampaign: payload.preferredCampaign || null,
      anonymousDonation: Boolean(payload.anonymousDonation),
      emailNotification:
        payload.emailNotification !== undefined
          ? Boolean(payload.emailNotification)
          : true,
      smsNotification:
        payload.smsNotification !== undefined
          ? Boolean(payload.smsNotification)
          : true,
      pushNotification:
        payload.pushNotification !== undefined
          ? Boolean(payload.pushNotification)
          : true,
    },
  });
};

export const getAllDonorPreferences = async (query?: { donorId?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;

  return await prisma.donorPreference.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorPreferenceById = async (id: string) => {
  const item = await prisma.donorPreference.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor preferences not found.");
  }
  return item;
};

