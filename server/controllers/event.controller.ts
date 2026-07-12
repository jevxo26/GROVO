import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface EventPayload {
  title: string;
  slug: string;
  categoryId: string;
  eventType: string;
  branchId: string;
  venue: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}

export class EventController {
  static async scheduleEvent(req: Request, res: Response): Promise<void> {
    const {
      title,
      slug,
      categoryId,
      eventType,
      branchId,
      venue,
      startDate,
      endDate,
      createdBy,
    } = req.body as EventPayload;

    if (!title || !slug || !branchId || !categoryId) {
      res
        .status(400)
        .json({ success: false, error: "Missing core scheduling records." });
      return;
    }

    try {
      const eventCode = `EVT-${Date.now()}`;
      const event = await prisma.event.create({
        data: {
          eventCode,
          title,
          slug,
          categoryId,
          eventType,
          branchId,
          venue,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          createdBy,
          status: "ACTIVE",
        },
      });
      res.status(200).json({ success: true, data: event });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async logAttendance(req: Request, res: Response): Promise<void> {
    const { eventId, userId, checkInTime } = req.body as {
      eventId: string;
      userId: string;
      checkInTime: string;
    };

    try {
      const log = await prisma.eventAttendance.create({
        data: {
          eventId,
          userId,
          checkInTime: new Date(checkInTime),
          attendanceStatus: "PRESENT",
        },
      });
      res.status(200).json({ success: true, data: log });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to record check-in telemetry.",
      });
    }
  }
}
