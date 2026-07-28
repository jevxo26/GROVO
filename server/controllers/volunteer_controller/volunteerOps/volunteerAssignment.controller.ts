import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 5. VOLUNTEER ASSIGNMENT CONTROLLERS ====================
export const createVolunteerAssignment = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerAssignment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer assignment created successfully",
    data: result,
  });
});

export const getAllVolunteerAssignments = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerAssignments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignments retrieved successfully",
    data: result,
  });
});

export const getVolunteerAssignmentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerAssignmentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignment retrieved successfully",
    data: result,
  });
});

export const updateVolunteerAssignment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerAssignment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignment updated successfully",
    data: result,
  });
});

export const deleteVolunteerAssignment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerAssignment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignment deleted successfully",
    data: result,
  });
});
