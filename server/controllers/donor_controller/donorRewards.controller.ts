import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { donorRewardsService } from "../../services/donor_service/donorRewards.service";
import { sendResponse } from "../../utils/sendResponse";

const createDonorCertificate = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorCertificate(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor certificate issued successfully",
    data: result,
  });
});

const createDonorBadge = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorBadge(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor badge awarded successfully",
    data: result,
  });
});

const createReferral = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createReferral(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Referral created successfully",
    data: result,
  });
});

const createReferralReward = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createReferralReward(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Referral reward assigned successfully",
    data: result,
  });
});

const createDonorActivity = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorActivity(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor activity logged successfully",
    data: result,
  });
});

const createDonorPreference = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorPreference(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor preferences created successfully",
    data: result,
  });
});

export const donorRewardsController = {
  createDonorCertificate,
  createDonorBadge,
  createReferral,
  createReferralReward,
  createDonorActivity,
  createDonorPreference,
};
