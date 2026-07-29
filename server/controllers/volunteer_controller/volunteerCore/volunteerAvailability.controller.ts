import status from "http-status";
import { volunteerCoreService } from "../../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 4. VOLUNTEER AVAILABILITY CONTROLLERS ====================
export const createVolunteerAvailability = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerAvailability(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer availability created successfully",
    data: result,
  });
});

export const getAllVolunteerAvailabilities = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerAvailabilities(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availabilities retrieved successfully",
    data: result,
  });
});

export const getVolunteerAvailabilityById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerAvailabilityById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availability retrieved successfully",
    data: result,
  });
});

export const updateVolunteerAvailability = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerAvailability(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availability updated successfully",
    data: result,
  });
});

export const deleteVolunteerAvailability = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerAvailability(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availability deleted successfully",
    data: result,
  });
});
