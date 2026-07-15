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

const createNotification = catchAsync(async (req, res) => {
  const { title, message, type, priority, channels, target_audience, template_variables, scheduled_at } = req.body;

  if (!title || !message || !type || !priority || !channels || !target_audience) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required fields for notification delivery.",
    );
  }

  const result = await notificationService.createNotification({
    title,
    message,
    type,
    priority,
    channels,
    target_audience,
    template_variables,
    scheduled_at,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Notification queued/sent successfully",
    data: result,
  });
});

const getMyNotifications = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const { is_read, page, limit } = req.query;

  const filters = {
    is_read: is_read !== undefined ? is_read === "true" : undefined,
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
  };

  const result = await notificationService.getMyNotifications(userId, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Notifications retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const markAsRead = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;

  const result = await notificationService.markAsRead(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Notification marked as read successfully",
    data: result,
  });
});

const createEmergencyAlert = catchAsync(async (req, res) => {
  const { title, description, campaign_id, priority, target_area, expires_at, channels } = req.body;

  if (!title || !description || !priority || !target_area || !expires_at || !channels) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required fields for emergency alert.",
    );
  }

  const result = await notificationService.createEmergencyAlert({
    title,
    description,
    campaign_id,
    priority,
    target_area,
    expires_at: new Date(expires_at),
    channels,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Emergency alert activated successfully",
    data: result,
  });
});

const resolveEmergencyAlert = catchAsync(async (req, res) => {
  const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;

  const result = await notificationService.resolveEmergencyAlert(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Emergency alert resolved successfully",
    data: result,
  });
});

export const notificationController = {
  queueAlert,
  getActiveAlerts,
  createNotification,
  getMyNotifications,
  markAsRead,
  createEmergencyAlert,
  resolveEmergencyAlert,
};
