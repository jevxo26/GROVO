import { SystemHealth } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const logSystemHealth = async (payload: SystemHealth) => {
  return await prisma.systemHealth.create({
    data: {
      serviceName: payload.serviceName,
      status: payload.status,
      responseTime: payload.responseTime,
      cpuUsage: payload.cpuUsage,
      memoryUsage: payload.memoryUsage,
      diskUsage: payload.diskUsage,
    },
  });
};

const getBranchPerformance = async (branchId: string) => {
  return await prisma.branchAnalytics.findMany({
    where: { branchId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
};

const generateReport = async (payload: {
  reportName: string;
  reportType: string;
  templateId?: string;
  parameters: any;
  generatedBy: string;
}) => {
  return await prisma.report.create({
    data: {
      reportName: payload.reportName,
      reportType: payload.reportType,
      templateId: payload.templateId || null,
      parameters: JSON.stringify(payload.parameters || {}),
      generatedBy: payload.generatedBy,
      status: "PROCESSING",
    },
  });
};

const getDashboardMe = async (userId: string) => {
  let dashboard = await prisma.dashboard.findFirst({
    where: { userId },
    include: { widgets: true },
  });

  if (!dashboard) {
    dashboard = await prisma.dashboard.create({
      data: {
        name: "My Workspace",
        description: "Default workspace dashboard layout",
        userId,
        isDefault: true,
        status: "ACTIVE",
      },
      include: { widgets: true },
    });

    const widget = await prisma.dashboardWidget.create({
      data: {
        dashboardId: dashboard.id,
        widgetType: "LINE_CHART",
        title: "Donations Growth",
        dataSource: "/api/v1/analytics/donations/growth",
        positionX: 0,
        positionY: 0,
        width: 4,
        height: 3,
      },
    });

    dashboard.widgets = [widget];
  }

  return {
    id: dashboard.id,
    name: dashboard.name,
    widgets: dashboard.widgets.map((w: any) => ({
      id: w.id,
      title: w.title,
      widgetType: w.widgetType,
    })),
  };
};

export const analyticsService = {
  logSystemHealth,
  getBranchPerformance,
  generateReport,
  getDashboardMe,
};
