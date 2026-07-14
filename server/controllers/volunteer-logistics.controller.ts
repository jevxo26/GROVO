import httpStatus from "http-status";
import customError from "../error/customError";
import { volunteerLogisticsService } from "../services/volunteer-logistics.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const logAttendance = catchAsync(async (req, res) => {
  const { volunteerId, scheduleId, checkInTime } = req.body;

  if (!volunteerId || !scheduleId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core attendance markers.",
    );
  }

  const result = await volunteerLogisticsService.logAttendance({
    volunteerId,
    scheduleId,
    checkInTime,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Volunteer attendance logged successfully",
    data: result,
  });
});

const submitExpense = catchAsync(async (req, res) => {
  const { volunteerId, activityId, expenseType, amount, description } = req.body;

  if (!volunteerId || !activityId || !expenseType || amount === undefined) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required expense parameters.",
    );
  }

  const result = await volunteerLogisticsService.submitExpense({
    volunteerId,
    activityId,
    expenseType,
    amount,
    description,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Volunteer expense submitted successfully",
    data: result,
  });
});

export const volunteerLogisticsController = {
  logAttendance,
  submitExpense,
};
