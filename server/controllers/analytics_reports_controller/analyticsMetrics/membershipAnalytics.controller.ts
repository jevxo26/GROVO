import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 13. MEMBERSHIP ANALYTICS CONTROLLERS ====================
export const createMembershipAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createMembershipAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership analytics created successfully",
    data: result,
  });
});

export const getAllMembershipAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllMembershipAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics retrieved successfully",
    data: result,
  });
});

export const getMembershipAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getMembershipAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics retrieved successfully",
    data: result,
  });
});

export const updateMembershipAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateMembershipAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics updated successfully",
    data: result,
  });
});

export const deleteMembershipAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteMembershipAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics deleted successfully",
    data: result,
  });
});
