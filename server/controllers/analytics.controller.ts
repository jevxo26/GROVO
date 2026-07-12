import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface MetricsPayload {
  serviceName: string;
  status: string;
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export class AnalyticsController {
  static async logSystemHealth(req: Request, res: Response): Promise<void> {
    const {
      serviceName,
      status,
      responseTime,
      cpuUsage,
      memoryUsage,
      diskUsage,
    } = req.body as MetricsPayload;

    if (!serviceName || !status) {
      res
        .status(400)
        .json({ success: false, error: "Missing health metric parameters." });
      return;
    }

    try {
      const log = await prisma.systemHealth.create({
        data: {
          serviceName,
          status,
          responseTime: parseFloat(responseTime.toString()),
          cpuUsage: parseFloat(cpuUsage.toString()),
          memoryUsage: parseFloat(memoryUsage.toString()),
          diskUsage: parseFloat(diskUsage.toString()),
        },
      });
      res.status(200).json({ success: true, data: log });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async getBranchPerformance(
    req: Request,
    res: Response,
  ): Promise<void> {
    const rawBranchId = req.params.branchId;

    // Type guard: extract single string if value is passed as an array
    const targetBranchId = Array.isArray(rawBranchId)
      ? rawBranchId[0]
      : rawBranchId;

    if (!targetBranchId || typeof targetBranchId !== "string") {
      res
        .status(400)
        .json({ success: false, error: "Invalid branch ID parameter syntax." });
      return;
    }

    try {
      const stats = await prisma.branchAnalytics.findMany({
        where: { branchId: targetBranchId },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
      res.status(200).json({ success: true, data: stats });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to retrieve analytics metrics.",
      });
    }
  }
}
