import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 7. VOLUNTEER ATTENDANCE CONTROLLERS ====================
export const createVolunteerAttendance = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerAttendance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer attendance recorded successfully",
    data: result,
  });
});

export const getAllVolunteerAttendances = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerAttendances(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendances retrieved successfully",
    data: result,
  });
});

export const getVolunteerAttendanceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerAttendanceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendance retrieved successfully",
    data: result,
  });
});

export const updateVolunteerAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerAttendance(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendance updated successfully",
    data: result,
  });
});

export const deleteVolunteerAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerAttendance(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendance deleted successfully",
    data: result,
  });
});
