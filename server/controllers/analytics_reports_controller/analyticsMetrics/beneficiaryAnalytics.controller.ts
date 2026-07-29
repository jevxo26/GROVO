import status from "http-status";
import { analyticsMetricsService } from "../../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 10. BENEFICIARY ANALYTICS CONTROLLERS ====================
export const createBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createBeneficiaryAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary analytics created successfully",
    data: result,
  });
});

export const getAllBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllBeneficiaryAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getBeneficiaryAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateBeneficiaryAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteBeneficiaryAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics deleted successfully",
    data: result,
  });
});
