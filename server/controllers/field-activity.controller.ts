import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class FieldActivityController {
  static async logActivity(req: Request, res: Response): Promise<void> {
    const {
      projectId,
      activityTitle,
      activityType,
      location,
      description,
      performedBy,
      activityDate,
    } = req.body as {
      projectId: string;
      activityTitle: string;
      activityType: string;
      location?: string;
      description?: string;
      performedBy: string;
      activityDate: string;
    };

    if (!projectId || !activityTitle || !performedBy) {
      res.status(400).json({
        success: false,
        error: "Missing core field activity credentials.",
      });
      return;
    }

    try {
      const activity = await prisma.fieldActivity.create({
        data: {
          projectId,
          activityTitle,
          activityType,
          location,
          description,
          performedBy,
          activityDate: new Date(activityDate),
        },
      });
      res.status(200).json({ success: true, data: activity });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async logVisit(req: Request, res: Response): Promise<void> {
    const { activityId, visitedBy, visitDate, remarks } = req.body as {
      activityId: string;
      visitedBy: string;
      visitDate: string;
      remarks?: string;
    };

    try {
      const visit = await prisma.fieldVisit.create({
        data: {
          activityId,
          visitedBy,
          visitDate: new Date(visitDate),
          remarks,
        },
      });
      res.status(200).json({ success: true, data: visit });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to record field tracking node.",
      });
    }
  }
}
