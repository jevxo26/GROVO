import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 6. VOLUNTEER SCHEDULE CONTROLLERS ====================
export const createVolunteerSchedule = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer schedule created successfully",
    data: result,
  });
});

export const getAllVolunteerSchedules = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedules retrieved successfully",
    data: result,
  });
});

export const getVolunteerScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerScheduleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedule retrieved successfully",
    data: result,
  });
});

export const updateVolunteerSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerSchedule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedule updated successfully",
    data: result,
  });
});

export const deleteVolunteerSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerSchedule(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedule deleted successfully",
    data: result,
  });
});
