import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 8. PROJECT ANALYTICS CONTROLLERS ====================
export const createProjectAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createProjectAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project analytics created successfully",
    data: result,
  });
});

export const getAllProjectAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllProjectAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics retrieved successfully",
    data: result,
  });
});

export const getProjectAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getProjectAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics retrieved successfully",
    data: result,
  });
});

export const updateProjectAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateProjectAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics updated successfully",
    data: result,
  });
});

export const deleteProjectAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteProjectAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics deleted successfully",
    data: result,
  });
});
