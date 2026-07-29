import status from "http-status";
import { donorRewardsService } from "../../../services/donor_service/donorRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 14. REFERRAL CONTROLLERS ====================
export const createReferral = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createReferral(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Referral created successfully",
    data: result,
  });
});

export const getAllReferrals = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllReferrals(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referrals retrieved successfully",
    data: result,
  });
});

export const getReferralById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getReferralById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral retrieved successfully",
    data: result,
  });
});

export const updateReferral = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateReferral(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral updated successfully",
    data: result,
  });
});

export const deleteReferral = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteReferral(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Referral deleted successfully",
    data: result,
  });
});
