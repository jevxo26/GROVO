import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 12. FINANCIAL ANALYTICS CONTROLLERS ====================
export const createFinancialAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createFinancialAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Financial analytics created successfully",
    data: result,
  });
});

export const getAllFinancialAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllFinancialAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics retrieved successfully",
    data: result,
  });
});

export const getFinancialAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getFinancialAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics retrieved successfully",
    data: result,
  });
});

export const updateFinancialAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateFinancialAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics updated successfully",
    data: result,
  });
});

export const deleteFinancialAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteFinancialAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics deleted successfully",
    data: result,
  });
});
