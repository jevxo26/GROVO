import httpStatus from "http-status";
import customError from "../error/customError";
import { eventService } from "../services/event.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const scheduleEvent = catchAsync(async (req, res) => {
  const {
    title,
    slug,
    categoryId,
    eventType,
    branchId,
    venue,
    startDate,
    endDate,
    createdBy,
  } = req.body;

  if (!title || !slug || !branchId || !categoryId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core scheduling records.",
    );
  }

  const result = await eventService.scheduleEvent({
    title,
    slug,
    categoryId,
    eventType,
    branchId,
    venue,
    startDate,
    endDate,
    createdBy,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Event scheduled successfully",
    data: result,
  });
});

const logAttendance = catchAsync(async (req, res) => {
  const { eventId, userId, checkInTime } = req.body;

  if (!eventId || !userId || !checkInTime) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required attendance parameters.",
    );
  }

  const result = await eventService.logAttendance({
    eventId,
    userId,
    checkInTime,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Check-in telemetry recorded successfully",
    data: result,
  });
});

export const eventController = {
  scheduleEvent,
  logAttendance,
};
