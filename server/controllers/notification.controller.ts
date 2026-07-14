import httpStatus from "http-status";
import customError from "../error/customError";
import { notificationService } from "../services/notification.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const queueAlert = catchAsync(async (req, res) => {
  const { recipientId, type, title, body, priority } = req.body;

  if (!recipientId || !title || !body) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core payload fields.",
    );
  }

  const result = await notificationService.queueAlert({
    recipientId,
    type,
    title,
    body,
    priority,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Alert queued successfully",
    data: result,
  });
});

const getActiveAlerts = catchAsync(async (req, res) => {
  const rawUser = req.params.userId;
  const targetUserId = Array.isArray(rawUser) ? rawUser[0] : rawUser;

  if (!targetUserId || typeof targetUserId !== "string") {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Invalid user parameter format.",
    );
  }

  const result = await notificationService.getActiveAlerts(targetUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Active alerts retrieved successfully",
    data: result,
  });
});

export const notificationController = {
  queueAlert,
  getActiveAlerts,
};
