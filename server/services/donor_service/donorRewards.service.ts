import status from "http-status";
import { prisma } from "../../lib/prisma";
import customError from "../../error/customError";

// ==================== 9. DONOR CERTIFICATE SERVICES ====================
const createDonorCertificate = async (payload: any) => {
  if (!payload.donorId || !payload.certificateType || !payload.certificateNumber || !payload.downloadUrl) {
    throw new customError(status.BAD_REQUEST, "donorId, certificateType, certificateNumber, and downloadUrl are required.");
  }

  const existing = await prisma.donorCertificate.findUnique({
    where: { certificateNumber: payload.certificateNumber },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Certificate number '${payload.certificateNumber}' already exists`
    );
  }

  return await prisma.donorCertificate.create({
    data: {
      donorId: payload.donorId,
      certificateType: payload.certificateType,
      certificateNumber: payload.certificateNumber,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : new Date(),
      downloadUrl: payload.downloadUrl,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDonorCertificates = async (query?: { donorId?: string; certificateType?: string; status?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.certificateType) where.certificateType = query.certificateType;
  if (query?.status) where.status = query.status;

  return await prisma.donorCertificate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorCertificateById = async (id: string) => {
  const item = await prisma.donorCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor certificate not found.");
  }
  return item;
};

const updateDonorCertificate = async (id: string, payload: any) => {
  const item = await prisma.donorCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor certificate not found.");
  }

  if (payload.certificateNumber && payload.certificateNumber !== item.certificateNumber) {
    const existing = await prisma.donorCertificate.findUnique({ where: { certificateNumber: payload.certificateNumber } });
    if (existing) {
      throw new customError(status.CONFLICT, `Certificate number '${payload.certificateNumber}' already exists`);
    }
  }

  return await prisma.donorCertificate.update({
    where: { id },
    data: {
      ...(payload.certificateType && { certificateType: payload.certificateType }),
      ...(payload.certificateNumber && { certificateNumber: payload.certificateNumber }),
      ...(payload.issueDate && { issueDate: new Date(payload.issueDate) }),
      ...(payload.downloadUrl && { downloadUrl: payload.downloadUrl }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDonorCertificate = async (id: string) => {
  const item = await prisma.donorCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor certificate not found.");
  }
  await prisma.donorCertificate.delete({ where: { id } });
  return { message: "Donor certificate deleted successfully." };
};


// ==================== 10. DONOR BADGE SERVICES ====================
const createDonorBadge = async (payload: any) => {
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

const getAllDonorBadges = async (query?: { donorId?: string; badgeLevel?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.badgeLevel) where.badgeLevel = query.badgeLevel;

  return await prisma.donorBadge.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorBadgeById = async (id: string) => {
  const item = await prisma.donorBadge.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor badge not found.");
  }
  return item;
};

const updateDonorBadge = async (id: string, payload: any) => {
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

const deleteDonorBadge = async (id: string) => {
  const item = await prisma.donorBadge.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor badge not found.");
  }
  await prisma.donorBadge.delete({ where: { id } });
  return { message: "Donor badge deleted successfully." };
};


// ==================== 14. REFERRAL SERVICES ====================
const createReferral = async (payload: any) => {
  if (!payload.referrerId || !payload.referredUserId || !payload.referralCode) {
    throw new customError(status.BAD_REQUEST, "referrerId, referredUserId, and referralCode are required.");
  }

  return await prisma.referral.create({
    data: {
      referrerId: payload.referrerId,
      referredUserId: payload.referredUserId,
      referralCode: payload.referralCode,
      status: payload.status || "PENDING",
    },
  });
};

const getAllReferrals = async (query?: { referrerId?: string; referredUserId?: string; status?: string }) => {
  const where: any = {};
  if (query?.referrerId) where.referrerId = query.referrerId;
  if (query?.referredUserId) where.referredUserId = query.referredUserId;
  if (query?.status) where.status = query.status;

  return await prisma.referral.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReferralById = async (id: string) => {
  const item = await prisma.referral.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral record not found.");
  }
  return item;
};

const updateReferral = async (id: string, payload: any) => {
  const item = await prisma.referral.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral record not found.");
  }

  return await prisma.referral.update({
    where: { id },
    data: {
      ...(payload.referralCode && { referralCode: payload.referralCode }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteReferral = async (id: string) => {
  const item = await prisma.referral.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral record not found.");
  }
  await prisma.referral.delete({ where: { id } });
  return { message: "Referral record deleted successfully." };
};


// ==================== 15. REFERRAL REWARD SERVICES ====================
const createReferralReward = async (payload: any) => {
  if (!payload.referralId || !payload.rewardType || payload.rewardValue === undefined) {
    throw new customError(status.BAD_REQUEST, "referralId, rewardType, and rewardValue are required.");
  }

  return await prisma.referralReward.create({
    data: {
      referralId: payload.referralId,
      rewardType: payload.rewardType,
      rewardValue: Number(payload.rewardValue),
      status: payload.status || "PENDING",
    },
  });
};

const getAllReferralRewards = async (query?: { referralId?: string; status?: string }) => {
  const where: any = {};
  if (query?.referralId) where.referralId = query.referralId;
  if (query?.status) where.status = query.status;

  return await prisma.referralReward.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReferralRewardById = async (id: string) => {
  const item = await prisma.referralReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral reward record not found.");
  }
  return item;
};

const updateReferralReward = async (id: string, payload: any) => {
  const item = await prisma.referralReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral reward record not found.");
  }

  return await prisma.referralReward.update({
    where: { id },
    data: {
      ...(payload.rewardType && { rewardType: payload.rewardType }),
      ...(payload.rewardValue !== undefined && { rewardValue: Number(payload.rewardValue) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteReferralReward = async (id: string) => {
  const item = await prisma.referralReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Referral reward record not found.");
  }
  await prisma.referralReward.delete({ where: { id } });
  return { message: "Referral reward record deleted successfully." };
};


// ==================== 16. DONOR ACTIVITY SERVICES ====================
const createDonorActivity = async (payload: any) => {
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

const getAllDonorActivities = async (query?: { donorId?: string; activityType?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.activityType) where.activityType = query.activityType;

  return await prisma.donorActivity.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorActivityById = async (id: string) => {
  const item = await prisma.donorActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor activity record not found.");
  }
  return item;
};

const deleteDonorActivity = async (id: string) => {
  const item = await prisma.donorActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor activity record not found.");
  }
  await prisma.donorActivity.delete({ where: { id } });
  return { message: "Donor activity record deleted successfully." };
};


// ==================== 17. DONOR PREFERENCE SERVICES ====================
const createDonorPreference = async (payload: any) => {
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

const getAllDonorPreferences = async (query?: { donorId?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;

  return await prisma.donorPreference.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorPreferenceById = async (id: string) => {
  const item = await prisma.donorPreference.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor preferences not found.");
  }
  return item;
};

const updateDonorPreference = async (id: string, payload: any) => {
  const item = await prisma.donorPreference.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor preferences not found.");
  }

  return await prisma.donorPreference.update({
    where: { id },
    data: {
      ...(payload.preferredCategory !== undefined && { preferredCategory: payload.preferredCategory }),
      ...(payload.preferredCampaign !== undefined && { preferredCampaign: payload.preferredCampaign }),
      ...(payload.anonymousDonation !== undefined && { anonymousDonation: Boolean(payload.anonymousDonation) }),
      ...(payload.emailNotification !== undefined && { emailNotification: Boolean(payload.emailNotification) }),
      ...(payload.smsNotification !== undefined && { smsNotification: Boolean(payload.smsNotification) }),
      ...(payload.pushNotification !== undefined && { pushNotification: Boolean(payload.pushNotification) }),
    },
  });
};

const deleteDonorPreference = async (id: string) => {
  const item = await prisma.donorPreference.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor preferences not found.");
  }
  await prisma.donorPreference.delete({ where: { id } });
  return { message: "Donor preferences deleted successfully." };
};


export const donorRewardsService = {
  // DonorCertificate
  createDonorCertificate,
  getAllDonorCertificates,
  getDonorCertificateById,
  updateDonorCertificate,
  deleteDonorCertificate,
  // DonorBadge
  createDonorBadge,
  getAllDonorBadges,
  getDonorBadgeById,
  updateDonorBadge,
  deleteDonorBadge,
  // Referral
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
  // ReferralReward
  createReferralReward,
  getAllReferralRewards,
  getReferralRewardById,
  updateReferralReward,
  deleteReferralReward,
  // DonorActivity
  createDonorActivity,
  getAllDonorActivities,
  getDonorActivityById,
  deleteDonorActivity,
  // DonorPreference
  createDonorPreference,
  getAllDonorPreferences,
  getDonorPreferenceById,
  updateDonorPreference,
  deleteDonorPreference,
};
