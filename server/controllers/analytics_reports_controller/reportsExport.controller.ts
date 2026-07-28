import status from "http-status";
import { reportsExportService } from "../../services/analytics_reports_service/reportsExport.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 15. REPORT CONTROLLERS ====================
const createReport = catchAsync(async (req, res) => {
  const result = await reportsExportService.createReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Report created successfully",
    data: result,
  });
});

const getAllReports = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllReports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Reports retrieved successfully",
    data: result,
  });
});

const getReportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getReportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report retrieved successfully",
    data: result,
  });
});

const updateReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateReport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report updated successfully",
    data: result,
  });
});

const deleteReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteReport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report deleted successfully",
    data: result,
  });
});


// ==================== 16. REPORT TEMPLATE CONTROLLERS ====================
const createReportTemplate = catchAsync(async (req, res) => {
  const result = await reportsExportService.createReportTemplate(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Report template created successfully",
    data: result,
  });
});

const getAllReportTemplates = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllReportTemplates(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report templates retrieved successfully",
    data: result,
  });
});

const getReportTemplateById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getReportTemplateById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report template retrieved successfully",
    data: result,
  });
});

const updateReportTemplate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateReportTemplate(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report template updated successfully",
    data: result,
  });
});

const deleteReportTemplate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteReportTemplate(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report template deleted successfully",
    data: result,
  });
});


// ==================== 17. SCHEDULED REPORT CONTROLLERS ====================
const createScheduledReport = catchAsync(async (req, res) => {
  const result = await reportsExportService.createScheduledReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Scheduled report created successfully",
    data: result,
  });
});

const getAllScheduledReports = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllScheduledReports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled reports retrieved successfully",
    data: result,
  });
});

const getScheduledReportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getScheduledReportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled report retrieved successfully",
    data: result,
  });
});

const updateScheduledReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateScheduledReport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled report updated successfully",
    data: result,
  });
});

const deleteScheduledReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteScheduledReport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Scheduled report deleted successfully",
    data: result,
  });
});


// ==================== 18. REPORT EXPORT CONTROLLERS ====================
const createReportExport = catchAsync(async (req, res) => {
  const result = await reportsExportService.createReportExport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Report export created successfully",
    data: result,
  });
});

const getAllReportExports = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllReportExports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report exports retrieved successfully",
    data: result,
  });
});

const getReportExportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getReportExportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report export retrieved successfully",
    data: result,
  });
});

const updateReportExport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateReportExport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report export updated successfully",
    data: result,
  });
});

const deleteReportExport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteReportExport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report export deleted successfully",
    data: result,
  });
});


export const reportsExportController = {
  // Report
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  // ReportTemplate
  createReportTemplate,
  getAllReportTemplates,
  getReportTemplateById,
  updateReportTemplate,
  deleteReportTemplate,
  // ScheduledReport
  createScheduledReport,
  getAllScheduledReports,
  getScheduledReportById,
  updateScheduledReport,
  deleteScheduledReport,
  // ReportExport
  createReportExport,
  getAllReportExports,
  getReportExportById,
  updateReportExport,
  deleteReportExport,
};
