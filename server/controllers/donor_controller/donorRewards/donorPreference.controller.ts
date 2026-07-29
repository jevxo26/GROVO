import status from "http-status";
import { donorRewardsService } from "../../../services/donor_service/donorRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 17. DONOR PREFERENCE CONTROLLERS ====================
export const createDonorPreference = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorPreference(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor preferences created successfully",
    data: result,
  });
});

export const getAllDonorPreferences = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorPreferences(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences retrieved successfully",
    data: result,
  });
});

export const getDonorPreferenceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorPreferenceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences retrieved successfully",
    data: result,
  });
});

export const updateDonorPreference = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateDonorPreference(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences updated successfully",
    data: result,
  });
});

export const deleteDonorPreference = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorPreference(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor preferences deleted successfully",
    data: result,
  });
});
