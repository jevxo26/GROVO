import status from "http-status";
import { reportsExportService } from "../../../services/analytics_reports_service/reportsExport.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 17. SCHEDULED REPORT CONTROLLERS ====================
export const createScheduledReport = catchAsync(async (req, res) => {
  const result = await reportsExportService.createScheduledReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Scheduled report created successfully",
    data: result,
  });
});

export const getAllScheduledReports = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllScheduledReports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled reports retrieved successfully",
    data: result,
  });
});

export const getScheduledReportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getScheduledReportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled report retrieved successfully",
    data: result,
  });
});

export const updateScheduledReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateScheduledReport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled report updated successfully",
    data: result,
  });
});

export const deleteScheduledReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteScheduledReport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled report deleted successfully",
    data: result,
  });
});
