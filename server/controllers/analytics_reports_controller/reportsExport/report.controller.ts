import status from "http-status";
import { reportsExportService } from "../../../services/analytics_reports_service/reportsExport.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 15. REPORT CONTROLLERS ====================
export const createReport = catchAsync(async (req, res) => {
  const result = await reportsExportService.createReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Report created successfully",
    data: result,
  });
});

export const getAllReports = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllReports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Reports retrieved successfully",
    data: result,
  });
});

export const getReportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getReportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report retrieved successfully",
    data: result,
  });
});

export const updateReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateReport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report updated successfully",
    data: result,
  });
});

export const deleteReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteReport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report deleted successfully",
    data: result,
  });
});
