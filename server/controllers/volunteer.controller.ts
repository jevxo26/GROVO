import httpStatus from "http-status";
import customError from "../error/customError";
import { volunteerService } from "../services/volunteer.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerPerformance = catchAsync(async (req, res) => {
  const {
    volunteerId,
    totalAssignments,
    completedAssignments,
    attendanceRate,
    score,
  } = req.body;

  if (!volunteerId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Volunteer target ID required.",
    );
  }

  const result = await volunteerService.registerPerformance({
    volunteerId,
    totalAssignments,
    completedAssignments,
    attendanceRate,
    score,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Volunteer performance registered successfully",
    data: result,
  });
});

const getAvailableVolunteers = catchAsync(async (req, res) => {
  const result = await volunteerService.getAvailableVolunteers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Available volunteers retrieved successfully",
    data: result,
  });
});

export const volunteerController = {
  registerPerformance,
  getAvailableVolunteers,
};
