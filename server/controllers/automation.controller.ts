import httpStatus from "http-status";
import customError from "../error/customError";
import { automationService } from "../services/automation.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const scheduleTask = catchAsync(async (req, res) => {
  const { taskName, taskType, scheduledAt, payload } = req.body;

  if (!taskName || !taskType || !scheduledAt) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core task fields.",
    );
  }

  const result = await automationService.scheduleTask({
    taskName,
    taskType,
    scheduledAt: new Date(scheduledAt),
    status: "PENDING",
    payload,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Task scheduled successfully",
    data: result,
  });
});

const logExecution = catchAsync(async (req, res) => {
  const { type, event, action, status, error } = req.body;

  const result = await automationService.logExecution({
    automationType: type,
    triggerEvent: event,
    action,
    status: status || "SUCCESS",
    errorMessage: error,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Automation telemetry recorded successfully",
    data: result,
  });
});

export const automationController = {
  scheduleTask,
  logExecution,
};
