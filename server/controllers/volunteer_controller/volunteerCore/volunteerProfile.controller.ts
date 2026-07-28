import status from "http-status";
import { volunteerCoreService } from "../../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 2. VOLUNTEER PROFILE CONTROLLERS ====================
export const createVolunteerProfile = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerProfile(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer profile created successfully",
    data: result,
  });
});

export const getAllVolunteerProfiles = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerProfiles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profiles retrieved successfully",
    data: result,
  });
});

export const getVolunteerProfileById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerProfileById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profile retrieved successfully",
    data: result,
  });
});

export const updateVolunteerProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerProfile(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profile updated successfully",
    data: result,
  });
});

export const deleteVolunteerProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerProfile(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profile deleted successfully",
    data: result,
  });
});
