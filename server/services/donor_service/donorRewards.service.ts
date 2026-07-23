import status from "http-status";
import { prisma } from "../../lib/prisma";
import customError from "../../error/customError";

const createDonorCertificate = async (payload: any) => {
  const existing = await prisma.donorCertificate.findUnique({
    where: { certificateNumber: payload.certificateNumber },
  });
  if (existing)
    throw new customError(
      status.CONFLICT,
      `Certificate '${payload.certificateNumber}' exists`,
    );
  return prisma.donorCertificate.create({
    data: {
      donorId: payload.donorId,
      certificateType: payload.certificateType,
      certificateNumber: payload.certificateNumber,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : undefined,
      downloadUrl: payload.downloadUrl,
      status: payload.status,
    },
  });
};

const createDonorBadge = async (payload: any) =>
  prisma.donorBadge.create({
    data: {
      donorId: payload.donorId,
      badgeName: payload.badgeName,
      badgeLevel: payload.badgeLevel,
      earnedAt: payload.earnedAt ? new Date(payload.earnedAt) : undefined,
    },
  });

const createReferral = async (payload: any) =>
  prisma.referral.create({
    data: {
      referrerId: payload.referrerId,
      referredUserId: payload.referredUserId,
      referralCode: payload.referralCode,
      status: payload.status,
    },
  });

const createReferralReward = async (payload: any) =>
  prisma.referralReward.create({
    data: {
      referralId: payload.referralId,
      rewardType: payload.rewardType,
      rewardValue: Number(payload.rewardValue),
      status: payload.status,
    },
  });

const createDonorActivity = async (payload: any) =>
  prisma.donorActivity.create({
    data: {
      donorId: payload.donorId,
      activityType: payload.activityType,
      description: payload.description,
      performedAt: payload.performedAt
        ? new Date(payload.performedAt)
        : undefined,
    },
  });

const createDonorPreference = async (payload: any) => {
  const existing = await prisma.donorPreference.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing)
    throw new customError(status.CONFLICT, "Preferences already exist");
  return prisma.donorPreference.create({
    data: {
      donorId: payload.donorId,
      preferredCategory: payload.preferredCategory,
      preferredCampaign: payload.preferredCampaign,
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

export const donorRewardsService = {
  createDonorCertificate,
  createDonorBadge,
  createReferral,
  createReferralReward,
  createDonorActivity,
  createDonorPreference,
};
