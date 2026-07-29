import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 9. VOLUNTEER ANALYTICS CONTROLLERS ====================
export const createVolunteerAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createVolunteerAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer analytics created successfully",
    data: result,
  });
});

export const getAllVolunteerAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllVolunteerAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics retrieved successfully",
    data: result,
  });
});

export const getVolunteerAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getVolunteerAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics retrieved successfully",
    data: result,
  });
});

export const updateVolunteerAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateVolunteerAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics updated successfully",
    data: result,
  });
});

export const deleteVolunteerAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteVolunteerAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics deleted successfully",
    data: result,
  });
});
