import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 1. DASHBOARD SERVICES ====================
export const createDashboard = async (payload: any) => {
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

export const getAllDashboards = async (query?: { userId?: string; status?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.status) where.status = query.status;

  return await prisma.dashboard.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDashboardById = async (id: string) => {
  const item = await prisma.dashboard.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard not found.");
  }
  return item;
};

export const updateDashboard = async (id: string, payload: any) => {
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

export const deleteDashboard = async (id: string) => {
  const item = await prisma.dashboard.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Dashboard not found.");
  }
  await prisma.dashboard.delete({ where: { id } });
  return { message: "Dashboard deleted successfully." };
};
