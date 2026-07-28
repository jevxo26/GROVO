import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 1. DASHBOARD SERVICES ====================
const createDashboard = async (payload: any) => {
  if (!payload.userId || !payload.dashboardName) {
    throw new customError(status.BAD_REQUEST, "userId and dashboardName are required.");
  }

  return await prisma.dashboard.create({
    data: {
      userId: payload.userId,
      dashboardName: payload.dashboardName,
      isDefault: payload.isDefault !== undefined ? Boolean(payload.isDefault) : false,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDashboards = async (query?: { userId?: string; status?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.status) where.status = query.status;

  return await prisma.dashboard.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDashboardById = async (id: string) => {
  const item = await prisma.dashboard.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard not found.");
  }
  return item;
};

const updateDashboard = async (id: string, payload: any) => {
  const item = await prisma.dashboard.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard not found.");
  }

  return await prisma.dashboard.update({
    where: { id },
    data: {
      ...(payload.dashboardName && { dashboardName: payload.dashboardName }),
      ...(payload.isDefault !== undefined && { isDefault: Boolean(payload.isDefault) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDashboard = async (id: string) => {
  const item = await prisma.dashboard.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard not found.");
  }
  await prisma.dashboard.delete({ where: { id } });
  return { message: "Dashboard deleted successfully." };
};


// ==================== 2. DASHBOARD WIDGET SERVICES ====================
const createDashboardWidget = async (payload: any) => {
  if (!payload.dashboardId || !payload.widgetName || !payload.widgetType) {
    throw new customError(status.BAD_REQUEST, "dashboardId, widgetName, and widgetType are required.");
  }

  return await prisma.dashboardWidget.create({
    data: {
      dashboardId: payload.dashboardId,
      widgetName: payload.widgetName,
      widgetType: payload.widgetType,
      position: payload.position ? Number(payload.position) : 0,
      configuration: payload.configuration || null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDashboardWidgets = async (query?: { dashboardId?: string; status?: string }) => {
  const where: any = {};
  if (query?.dashboardId) where.dashboardId = query.dashboardId;
  if (query?.status) where.status = query.status;

  return await prisma.dashboardWidget.findMany({
    where,
    orderBy: { position: "asc" },
  });
};

const getDashboardWidgetById = async (id: string) => {
  const item = await prisma.dashboardWidget.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard widget not found.");
  }
  return item;
};

const updateDashboardWidget = async (id: string, payload: any) => {
  const item = await prisma.dashboardWidget.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard widget not found.");
  }

  return await prisma.dashboardWidget.update({
    where: { id },
    data: {
      ...(payload.widgetName && { widgetName: payload.widgetName }),
      ...(payload.widgetType && { widgetType: payload.widgetType }),
      ...(payload.position !== undefined && { position: Number(payload.position) }),
      ...(payload.configuration !== undefined && { configuration: payload.configuration }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDashboardWidget = async (id: string) => {
  const item = await prisma.dashboardWidget.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard widget not found.");
  }
  await prisma.dashboardWidget.delete({ where: { id } });
  return { message: "Dashboard widget deleted successfully." };
};


// ==================== 3. DASHBOARD LAYOUT SERVICES ====================
const createDashboardLayout = async (payload: any) => {
  if (!payload.dashboardId || !payload.layoutType) {
    throw new customError(status.BAD_REQUEST, "dashboardId and layoutType are required.");
  }

  return await prisma.dashboardLayout.create({
    data: {
      dashboardId: payload.dashboardId,
      layoutType: payload.layoutType,
      columns: payload.columns ? Number(payload.columns) : 12,
      rows: payload.rows ? Number(payload.rows) : 6,
    },
  });
};

const getAllDashboardLayouts = async (query?: { dashboardId?: string }) => {
  const where: any = {};
  if (query?.dashboardId) where.dashboardId = query.dashboardId;

  return await prisma.dashboardLayout.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDashboardLayoutById = async (id: string) => {
  const item = await prisma.dashboardLayout.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard layout not found.");
  }
  return item;
};

const updateDashboardLayout = async (id: string, payload: any) => {
  const item = await prisma.dashboardLayout.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard layout not found.");
  }

  return await prisma.dashboardLayout.update({
    where: { id },
    data: {
      ...(payload.layoutType && { layoutType: payload.layoutType }),
      ...(payload.columns !== undefined && { columns: Number(payload.columns) }),
      ...(payload.rows !== undefined && { rows: Number(payload.rows) }),
    },
  });
};

const deleteDashboardLayout = async (id: string) => {
  const item = await prisma.dashboardLayout.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard layout not found.");
  }
  await prisma.dashboardLayout.delete({ where: { id } });
  return { message: "Dashboard layout deleted successfully." };
};


// ==================== 4. KPI SERVICES ====================
const createKPI = async (payload: any) => {
  if (!payload.name || payload.targetValue === undefined || !payload.unit) {
    throw new customError(status.BAD_REQUEST, "name, targetValue, and unit are required.");
  }

  const existing = await prisma.kPI.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `KPI '${payload.name}' already exists`);
  }

  return await prisma.kPI.create({
    data: {
      name: payload.name,
      description: payload.description || null,
      targetValue: Number(payload.targetValue),
      currentValue: payload.currentValue ? Number(payload.currentValue) : 0,
      unit: payload.unit,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllKPIs = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.name = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.kPI.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getKPIById = async (id: string) => {
  const item = await prisma.kPI.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "KPI not found.");
  }
  return item;
};

const updateKPI = async (id: string, payload: any) => {
  const item = await prisma.kPI.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "KPI not found.");
  }

  if (payload.name && payload.name !== item.name) {
    const existing = await prisma.kPI.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, `KPI '${payload.name}' already exists`);
    }
  }

  return await prisma.kPI.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.targetValue !== undefined && { targetValue: Number(payload.targetValue) }),
      ...(payload.currentValue !== undefined && { currentValue: Number(payload.currentValue) }),
      ...(payload.unit && { unit: payload.unit }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteKPI = async (id: string) => {
  const item = await prisma.kPI.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "KPI not found.");
  }
  await prisma.kPI.delete({ where: { id } });
  return { message: "KPI deleted successfully." };
};


export const dashboardCoreService = {
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
