import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 14. VOLUNTEER REWARD CONTROLLERS ====================
export const createVolunteerReward = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerReward(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer reward created successfully",
    data: result,
  });
});

export const getAllVolunteerRewards = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerRewards(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer rewards retrieved successfully",
    data: result,
  });
});

export const getVolunteerRewardById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerRewardById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reward retrieved successfully",
    data: result,
  });
});

export const updateVolunteerReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerReward(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reward updated successfully",
    data: result,
  });
});

export const deleteVolunteerReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerReward(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reward deleted successfully",
    data: result,
  });
});
