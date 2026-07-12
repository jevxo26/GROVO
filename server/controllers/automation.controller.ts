import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class AutomationController {
  static async scheduleTask(req: Request, res: Response): Promise<void> {
    const { taskName, taskType, scheduledAt, payload } = req.body as {
      taskName: string;
      taskType: string;
      scheduledAt: string;
      payload?: string;
    };

    if (!taskName || !taskType || !scheduledAt) {
      res
        .status(400)
        .json({ success: false, error: "Missing core task fields." });
      return;
    }

    try {
      const task = await prisma.autoTask.create({
        data: {
          taskName,
          taskType,
          scheduledAt: new Date(scheduledAt),
          status: "PENDING",
          payload,
        },
      });
      res.status(200).json({ success: true, data: task });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async logExecution(req: Request, res: Response): Promise<void> {
    const { type, event, action, status, error } = req.body as {
      type: string;
      event: string;
      action: string;
      status: string;
      error?: string;
    };

    try {
      const log = await prisma.automationLog.create({
        data: {
          automationType: type,
          triggerEvent: event,
          action,
          status: status || "SUCCESS",
          errorMessage: error,
        },
      });
      res.status(200).json({ success: true, data: log });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to record automation telemetry.",
      });
    }
  }
}
