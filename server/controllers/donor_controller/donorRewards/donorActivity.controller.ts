import status from "http-status";
import { donorRewardsService } from "../../../services/donor_service/donorRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 16. DONOR ACTIVITY CONTROLLERS ====================
export const createDonorActivity = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorActivity(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor activity created successfully",
    data: result,
  });
});

export const getAllDonorActivities = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorActivities(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor activities retrieved successfully",
    data: result,
  });
});

export const getDonorActivityById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorActivityById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor activity retrieved successfully",
    data: result,
  });
});

export const deleteDonorActivity = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorActivity(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor activity deleted successfully",
    data: result,
  });
});
