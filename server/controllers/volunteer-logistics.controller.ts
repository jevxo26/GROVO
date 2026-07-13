import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class VolunteerLogisticsController {
  static async logAttendance(req: Request, res: Response): Promise<void> {
    const { volunteerId, scheduleId, checkInTime } = req.body as {
      volunteerId: string;
      scheduleId: string;
      checkInTime: string;
    };

    if (!volunteerId || !scheduleId) {
      res
        .status(400)
        .json({ success: false, error: "Missing core attendance markers." });
      return;
    }

    try {
      const attendance = await prisma.volunteerAttendance.create({
        data: {
          volunteerId,
          scheduleId,
          checkInTime: new Date(checkInTime),
          attendanceStatus: "PRESENT",
        },
      });
      res.status(200).json({ success: true, data: attendance });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async submitExpense(req: Request, res: Response): Promise<void> {
    const { volunteerId, activityId, expenseType, amount, description } =
      req.body as {
        volunteerId: string;
        activityId: string;
        expenseType: string;
        amount: number;
        description?: string;
      };

    try {
      const bill = await prisma.volunteerExpense.create({
        data: {
          volunteerId,
          activityId,
          expenseType,
          amount: parseFloat(amount.toString()),
          description,
          status: "PENDING",
        },
      });
      res.status(200).json({ success: true, data: bill });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Failed to record expense log entry." });
    }
  }
}
