import status from "http-status";
import { volunteerCoreService } from "../../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 1. VOLUNTEER CONTROLLERS ====================
export const createVolunteer = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteer(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer created successfully",
    data: result,
  });
});

export const getAllVolunteers = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteers retrieved successfully",
    data: result,
  });
});

export const getVolunteerById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer retrieved successfully",
    data: result,
  });
});

export const updateVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteer(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer updated successfully",
    data: result,
  });
});

export const deleteVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteer(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer deleted successfully",
    data: result,
  });
});
