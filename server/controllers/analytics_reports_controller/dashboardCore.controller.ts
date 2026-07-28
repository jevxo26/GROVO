import status from "http-status";
import { dashboardCoreService } from "../../services/analytics_reports_service/dashboardCore.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 1. DASHBOARD CONTROLLERS ====================
const createDashboard = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createDashboard(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Dashboard created successfully",
    data: result,
  });
});

const getAllDashboards = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllDashboards(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboards retrieved successfully",
    data: result,
  });
});

const getDashboardById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getDashboardById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard retrieved successfully",
    data: result,
  });
});

const updateDashboard = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateDashboard(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard updated successfully",
    data: result,
  });
});

const deleteDashboard = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteDashboard(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard deleted successfully",
    data: result,
  });
});


// ==================== 2. DASHBOARD WIDGET CONTROLLERS ====================
const createDashboardWidget = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createDashboardWidget(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Dashboard widget created successfully",
    data: result,
  });
});

const getAllDashboardWidgets = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllDashboardWidgets(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widgets retrieved successfully",
    data: result,
  });
});

const getDashboardWidgetById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getDashboardWidgetById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widget retrieved successfully",
    data: result,
  });
});

const updateDashboardWidget = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateDashboardWidget(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widget updated successfully",
    data: result,
  });
});

const deleteDashboardWidget = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteDashboardWidget(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widget deleted successfully",
    data: result,
  });
});


// ==================== 3. DASHBOARD LAYOUT CONTROLLERS ====================
const createDashboardLayout = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createDashboardLayout(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Dashboard layout created successfully",
    data: result,
  });
});

const getAllDashboardLayouts = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllDashboardLayouts(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layouts retrieved successfully",
    data: result,
  });
});

const getDashboardLayoutById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getDashboardLayoutById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layout retrieved successfully",
    data: result,
  });
});

const updateDashboardLayout = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateDashboardLayout(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layout updated successfully",
    data: result,
  });
});

const deleteDashboardLayout = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteDashboardLayout(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard layout deleted successfully",
    data: result,
  });
});


// ==================== 4. KPI CONTROLLERS ====================
const createKPI = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createKPI(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "KPI created successfully",
    data: result,
  });
});

const getAllKPIs = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllKPIs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPIs retrieved successfully",
    data: result,
  });
});

const getKPIById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getKPIById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPI retrieved successfully",
    data: result,
  });
});

const updateKPI = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateKPI(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPI updated successfully",
    data: result,
  });
});

const deleteKPI = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteKPI(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPI deleted successfully",
    data: result,
  });
});


export const dashboardCoreController = {
  // Dashboard
  createDashboard,
  getAllDashboards,
  getDashboardById,
  updateDashboard,
  deleteDashboard,
  // DashboardWidget
  createDashboardWidget,
  getAllDashboardWidgets,
  getDashboardWidgetById,
  updateDashboardWidget,
  deleteDashboardWidget,
  // DashboardLayout
  createDashboardLayout,
  getAllDashboardLayouts,
  getDashboardLayoutById,
  updateDashboardLayout,
  deleteDashboardLayout,
  // KPI
  createKPI,
  getAllKPIs,
  getKPIById,
  updateKPI,
  deleteKPI,
};
