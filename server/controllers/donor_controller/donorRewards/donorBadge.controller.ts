import status from "http-status";
import { donorRewardsService } from "../../../services/donor_service/donorRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 10. DONOR BADGE CONTROLLERS ====================
export const createDonorBadge = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorBadge(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor badge created successfully",
    data: result,
  });
});

export const getAllDonorBadges = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorBadges(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badges retrieved successfully",
    data: result,
  });
});

export const getDonorBadgeById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorBadgeById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badge retrieved successfully",
    data: result,
  });
});

export const updateDonorBadge = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateDonorBadge(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badge updated successfully",
    data: result,
  });
});

export const deleteDonorBadge = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorBadge(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor badge deleted successfully",
    data: result,
  });
});
