import status from "http-status";
import { dashboardCoreService } from "../../../services/analytics_reports_service/dashboardCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 3. DASHBOARD LAYOUT CONTROLLERS ====================
export const createDashboardLayout = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createDashboardLayout(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Dashboard layout created successfully",
    data: result,
  });
});

export const getAllDashboardLayouts = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllDashboardLayouts(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layouts retrieved successfully",
    data: result,
  });
});

export const getDashboardLayoutById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getDashboardLayoutById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layout retrieved successfully",
    data: result,
  });
});

export const updateDashboardLayout = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateDashboardLayout(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layout updated successfully",
    data: result,
  });
});

export const deleteDashboardLayout = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteDashboardLayout(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layout deleted successfully",
    data: result,
  });
});
