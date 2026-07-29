import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 2. DASHBOARD WIDGET SERVICES ====================
export const createDashboardWidget = async (payload: any) => {
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

export const getAllDashboardWidgets = async (query?: { dashboardId?: string; status?: string }) => {
  const where: any = {};
  if (query?.dashboardId) where.dashboardId = query.dashboardId;
  if (query?.status) where.status = query.status;

  return await prisma.dashboardWidget.findMany({
    where,
    orderBy: { position: "asc" },
  });
};

export const getDashboardWidgetById = async (id: string) => {
  const item = await prisma.dashboardWidget.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard widget not found.");
  }
  return item;
};

export const updateDashboardWidget = async (id: string, payload: any) => {
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

export const deleteDashboardWidget = async (id: string) => {
  const item = await prisma.dashboardWidget.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard widget not found.");
  }
  await prisma.dashboardWidget.delete({ where: { id } });
  return { message: "Dashboard widget deleted successfully." };
};
