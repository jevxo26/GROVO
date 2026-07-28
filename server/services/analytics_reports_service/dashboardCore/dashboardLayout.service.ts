import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 3. DASHBOARD LAYOUT SERVICES ====================
export const createDashboardLayout = async (payload: any) => {
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

export const getAllDashboardLayouts = async (query?: { dashboardId?: string }) => {
  const where: any = {};
  if (query?.dashboardId) where.dashboardId = query.dashboardId;

  return await prisma.dashboardLayout.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDashboardLayoutById = async (id: string) => {
  const item = await prisma.dashboardLayout.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard layout not found.");
  }
  return item;
};

export const updateDashboardLayout = async (id: string, payload: any) => {
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

export const deleteDashboardLayout = async (id: string) => {
  const item = await prisma.dashboardLayout.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard layout not found.");
  }
  await prisma.dashboardLayout.delete({ where: { id } });
  return { message: "Dashboard layout deleted successfully." };
};
