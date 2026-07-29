import status from "http-status";
import { donorRewardsService } from "../../../services/donor_service/donorRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 15. REFERRAL REWARD CONTROLLERS ====================
export const createReferralReward = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createReferralReward(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Referral reward created successfully",
    data: result,
  });
});

export const getAllReferralRewards = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllReferralRewards(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral rewards retrieved successfully",
    data: result,
  });
});

export const getReferralRewardById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getReferralRewardById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral reward retrieved successfully",
    data: result,
  });
});

export const updateReferralReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateReferralReward(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral reward updated successfully",
    data: result,
  });
});

export const deleteReferralReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteReferralReward(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral reward deleted successfully",
    data: result,
  });
});
