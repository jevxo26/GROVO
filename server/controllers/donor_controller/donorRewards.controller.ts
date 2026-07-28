import status from "http-status";
import { donorRewardsService } from "../../services/donor_service/donorRewards.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 9. DONOR CERTIFICATE CONTROLLERS ====================
const createDonorCertificate = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorCertificate(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor certificate created successfully",
    data: result,
  });
});

const getAllDonorCertificates = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorCertificates(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificates retrieved successfully",
    data: result,
  });
});

const getDonorCertificateById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorCertificateById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificate retrieved successfully",
    data: result,
  });
});

const updateDonorCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateDonorCertificate(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificate updated successfully",
    data: result,
  });
});

const deleteDonorCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorCertificate(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificate deleted successfully",
    data: result,
  });
});


// ==================== 10. DONOR BADGE CONTROLLERS ====================
const createDonorBadge = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorBadge(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor badge created successfully",
    data: result,
  });
});

const getAllDonorBadges = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorBadges(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badges retrieved successfully",
    data: result,
  });
});

const getDonorBadgeById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorBadgeById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badge retrieved successfully",
    data: result,
  });
});

const updateDonorBadge = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateDonorBadge(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badge updated successfully",
    data: result,
  });
});

const deleteDonorBadge = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorBadge(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badge deleted successfully",
    data: result,
  });
});


// ==================== 14. REFERRAL CONTROLLERS ====================
const createReferral = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createReferral(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Referral created successfully",
    data: result,
  });
});

const getAllReferrals = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllReferrals(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referrals retrieved successfully",
    data: result,
  });
});

const getReferralById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getReferralById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral retrieved successfully",
    data: result,
  });
});

const updateReferral = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateReferral(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral updated successfully",
    data: result,
  });
});

const deleteReferral = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteReferral(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral deleted successfully",
    data: result,
  });
});


// ==================== 15. REFERRAL REWARD CONTROLLERS ====================
const createReferralReward = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createReferralReward(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Referral reward created successfully",
    data: result,
  });
});

const getAllReferralRewards = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllReferralRewards(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral rewards retrieved successfully",
    data: result,
  });
});

const getReferralRewardById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getReferralRewardById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral reward retrieved successfully",
    data: result,
  });
});

const updateReferralReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateReferralReward(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral reward updated successfully",
    data: result,
  });
});

const deleteReferralReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteReferralReward(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral reward deleted successfully",
    data: result,
  });
});


// ==================== 16. DONOR ACTIVITY CONTROLLERS ====================
const createDonorActivity = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorActivity(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor activity created successfully",
    data: result,
  });
});

const getAllDonorActivities = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorActivities(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor activities retrieved successfully",
    data: result,
  });
});

const getDonorActivityById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorActivityById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor activity retrieved successfully",
    data: result,
  });
});

const deleteDonorActivity = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorActivity(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor activity deleted successfully",
    data: result,
  });
});


// ==================== 17. DONOR PREFERENCE CONTROLLERS ====================
const createDonorPreference = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorPreference(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor preferences created successfully",
    data: result,
  });
});

const getAllDonorPreferences = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorPreferences(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences retrieved successfully",
    data: result,
  });
});

const getDonorPreferenceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorPreferenceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences retrieved successfully",
    data: result,
  });
});

const updateDonorPreference = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateDonorPreference(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences updated successfully",
    data: result,
  });
});

const deleteDonorPreference = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorPreference(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences deleted successfully",
    data: result,
  });
});


export const donorRewardsController = {
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
