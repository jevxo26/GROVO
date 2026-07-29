import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 14. USER ACTIVITY ANALYTICS CONTROLLERS ====================
export const createUserActivityAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createUserActivityAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User activity analytics created successfully",
    data: result,
  });
});

export const getAllUserActivityAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllUserActivityAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics retrieved successfully",
    data: result,
  });
});

export const getUserActivityAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getUserActivityAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics retrieved successfully",
    data: result,
  });
});

export const updateUserActivityAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateUserActivityAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics updated successfully",
    data: result,
  });
});

export const deleteUserActivityAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteUserActivityAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics deleted successfully",
    data: result,
  });
});
