import httpStatus from "http-status";
import customError from "../error/customError";
import { volunteerLogisticsService } from "../services/volunteer-logistics.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const logAttendance = catchAsync(async (req, res) => {
  const { volunteerId, scheduleId, checkInTime } = req.body;

  if (!volunteerId || !scheduleId || !checkInTime) {
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
  const { volunteerId, activityId, expenseType, amount, description, receiptUrl } = req.body;

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
    amount: Number(amount),
    description,
    receiptUrl,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Volunteer expense submitted successfully",
    data: result,
  });
});

const approveExpense = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  const result = await volunteerLogisticsService.approveExpense(id, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Expense approved successfully",
    data: result,
  });
});

const submitFieldReport = catchAsync(async (req, res) => {
  const activityId = req.params.id as string;
  const { volunteerId, activity, description } = req.body;

  if (!volunteerId || !activity) {
    throw new customError(httpStatus.BAD_REQUEST, "volunteerId and activity are required.");
  }

  const result = await volunteerLogisticsService.submitFieldReport({
    volunteerId,
    activity,
    description,
    performedBy: volunteerId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Field report submitted successfully",
    data: result,
  });
});

export const volunteerLogisticsController = {
  logAttendance,
  submitExpense,
  approveExpense,
  submitFieldReport,
};
