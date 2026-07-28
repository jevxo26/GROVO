import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 19. VOLUNTEER TRAINING CONTROLLERS ====================
export const createVolunteerTraining = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerTraining(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer training created successfully",
    data: result,
  });
});

export const getAllVolunteerTrainings = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerTrainings(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer trainings retrieved successfully",
    data: result,
  });
});

export const getVolunteerTrainingById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerTrainingById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer training retrieved successfully",
    data: result,
  });
});

export const updateVolunteerTraining = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerTraining(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer training updated successfully",
    data: result,
  });
});

export const deleteVolunteerTraining = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerTraining(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer training deleted successfully",
    data: result,
  });
});
