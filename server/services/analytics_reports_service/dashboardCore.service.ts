import { prisma } from "../../lib/prisma";

const createDashboard = async (payload: any) => {
  return await prisma.dashboard.create({ data: payload });
};

const createDashboardWidget = async (payload: any) => {
  return await prisma.dashboardWidget.create({ data: payload });
};

const createDashboardLayout = async (payload: any) => {
  return await prisma.dashboardLayout.create({ data: payload });
};

const createKPI = async (payload: any) => {
  return await prisma.kPI.create({ data: payload });
};

const getKPIs = async () => {
  return await prisma.kPI.findMany({ where: { status: "ACTIVE" } });
};

export const DashboardCoreService = {
  createDashboard,
  createDashboardWidget,
  createDashboardLayout,
  createKPI,
  getKPIs,
};
