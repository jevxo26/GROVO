import status from "http-status";
import { dashboardCoreService } from "../../../services/analytics_reports_service/dashboardCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 1. DASHBOARD CONTROLLERS ====================
export const createDashboard = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createDashboard(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Dashboard created successfully",
    data: result,
  });
});

export const getAllDashboards = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllDashboards(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboards retrieved successfully",
    data: result,
  });
});

export const getDashboardById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getDashboardById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard retrieved successfully",
    data: result,
  });
});

export const updateDashboard = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateDashboard(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard updated successfully",
    data: result,
  });
});

export const deleteDashboard = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteDashboard(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard deleted successfully",
    data: result,
  });
});
