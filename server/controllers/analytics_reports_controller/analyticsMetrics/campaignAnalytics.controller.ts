import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 7. CAMPAIGN ANALYTICS CONTROLLERS ====================
export const createCampaignAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createCampaignAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign analytics created successfully",
    data: result,
  });
});

export const getAllCampaignAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllCampaignAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics retrieved successfully",
    data: result,
  });
});

export const getCampaignAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getCampaignAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics retrieved successfully",
    data: result,
  });
});

export const updateCampaignAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateCampaignAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics updated successfully",
    data: result,
  });
});

export const deleteCampaignAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteCampaignAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics deleted successfully",
    data: result,
  });
});
