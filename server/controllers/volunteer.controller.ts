import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class VolunteerController {
  static async registerPerformance(req: Request, res: Response): Promise<void> {
    const {
      volunteerId,
      totalAssignments,
      completedAssignments,
      attendanceRate,
      score,
    } = req.body as {
      volunteerId: string;
      totalAssignments: number;
      completedAssignments: number;
      attendanceRate: number;
      score: number;
    };

    if (!volunteerId) {
      res
        .status(400)
        .json({ success: false, error: "Volunteer target ID required." });
      return;
    }

    try {
      const metric = await prisma.volunteerPerformance.create({
        data: {
          volunteerId,
          totalAssignments,
          completedAssignments,
          attendanceRate,
          performanceScore: score,
        },
      });
      res.status(200).json({ success: true, data: metric });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async getAvailableVolunteers(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const active = await prisma.volunteer.findMany({
        where: { status: "ACTIVE" },
        include: {
          availabilities: { where: { isAvailable: true } },
          skills: true,
        },
      });
      res.status(200).json({ success: true, data: active });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Failed to track active metrics." });
    }
  }
}
