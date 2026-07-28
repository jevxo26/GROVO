import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 13. VOLUNTEER PERFORMANCE CONTROLLERS ====================
export const createVolunteerPerformance = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerPerformance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer performance created successfully",
    data: result,
  });
});

export const getAllVolunteerPerformances = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerPerformances(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performances retrieved successfully",
    data: result,
  });
});

export const getVolunteerPerformanceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerPerformanceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performance retrieved successfully",
    data: result,
  });
});

export const updateVolunteerPerformance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerPerformance(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performance updated successfully",
    data: result,
  });
});

export const deleteVolunteerPerformance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerPerformance(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performance deleted successfully",
    data: result,
  });
});
