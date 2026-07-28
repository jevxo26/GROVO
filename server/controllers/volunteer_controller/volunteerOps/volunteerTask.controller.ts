import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 8. VOLUNTEER TASK CONTROLLERS ====================
export const createVolunteerTask = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerTask(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer task created successfully",
    data: result,
  });
});

export const getAllVolunteerTasks = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerTasks(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer tasks retrieved successfully",
    data: result,
  });
});

export const getVolunteerTaskById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerTaskById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer task retrieved successfully",
    data: result,
  });
});

export const updateVolunteerTask = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerTask(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer task updated successfully",
    data: result,
  });
});

export const deleteVolunteerTask = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerTask(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer task deleted successfully",
    data: result,
  });
});
