import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 5. ANALYTICS SNAPSHOT CONTROLLERS ====================
export const createAnalyticsSnapshot = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createAnalyticsSnapshot(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Analytics snapshot created successfully",
    data: result,
  });
});

export const getAllAnalyticsSnapshots = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllAnalyticsSnapshots();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshots retrieved successfully",
    data: result,
  });
});

export const getAnalyticsSnapshotById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getAnalyticsSnapshotById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshot retrieved successfully",
    data: result,
  });
});

export const updateAnalyticsSnapshot = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateAnalyticsSnapshot(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshot updated successfully",
    data: result,
  });
});

export const deleteAnalyticsSnapshot = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteAnalyticsSnapshot(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshot deleted successfully",
    data: result,
  });
});
