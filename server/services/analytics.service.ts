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

export const analyticsService = {
  logSystemHealth,
  getBranchPerformance,
};
