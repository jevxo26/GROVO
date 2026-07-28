import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 11. BRANCH ANALYTICS CONTROLLERS ====================
export const createBranchAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createBranchAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch analytics created successfully",
    data: result,
  });
});

export const getAllBranchAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllBranchAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics retrieved successfully",
    data: result,
  });
});

export const getBranchAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getBranchAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics retrieved successfully",
    data: result,
  });
});

export const updateBranchAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateBranchAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics updated successfully",
    data: result,
  });
});

export const deleteBranchAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteBranchAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics deleted successfully",
    data: result,
  });
});
