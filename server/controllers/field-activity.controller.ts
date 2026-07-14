import httpStatus from "http-status";
import customError from "../error/customError";
import { fieldActivityService } from "../services/field-activity.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const logActivity = catchAsync(async (req, res) => {
  const {
    projectId,
    activityTitle,
    activityType,
    location,
    description,
    performedBy,
    activityDate,
  } = req.body;

  if (!projectId || !activityTitle || !performedBy) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core field activity credentials.",
    );
  }

  const result = await fieldActivityService.logActivity({
    projectId,
    activityTitle,
    activityType,
    location,
    description,
    performedBy,
    activityDate,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Field activity logged successfully",
    data: result,
  });
});

const logVisit = catchAsync(async (req, res) => {
  const { activityId, visitedBy, visitDate, remarks } = req.body;

  if (!activityId || !visitedBy || !visitDate) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required visit parameters.",
    );
  }

  const result = await fieldActivityService.logVisit({
    activityId,
    visitedBy,
    visitDate,
    remarks,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Field visit recorded successfully",
    data: result,
  });
});

export const fieldActivityController = {
  logActivity,
  logVisit,
};
