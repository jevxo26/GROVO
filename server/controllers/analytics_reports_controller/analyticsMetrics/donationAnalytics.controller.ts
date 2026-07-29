import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 6. DONATION ANALYTICS CONTROLLERS ====================
export const createDonationAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createDonationAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation analytics created successfully",
    data: result,
  });
});

export const getAllDonationAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllDonationAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics retrieved successfully",
    data: result,
  });
});

export const getDonationAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getDonationAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics retrieved successfully",
    data: result,
  });
});

export const updateDonationAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateDonationAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics updated successfully",
    data: result,
  });
});

export const deleteDonationAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteDonationAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics deleted successfully",
    data: result,
  });
});
