import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface TicketPayload {
  userId: string;
  subject: string;
  description: string;
  category: string;
  priority?: string;
}

export class SupportController {
  static async openTicket(req: Request, res: Response): Promise<void> {
    const { userId, subject, description, category, priority } =
      req.body as TicketPayload;

    if (!userId || !subject || !description) {
      res
        .status(400)
        .json({ success: false, error: "Missing core support fields." });
      return;
    }

    try {
      const ticketNumber = `TCK-${Date.now()}`;
      const ticket = await prisma.supportTicket.create({
        data: {
          ticketNumber,
          userId,
          subject,
          description,
          category,
          priority: priority || "MEDIUM",
          status: "OPEN",
        },
      });
      res.status(200).json({ success: true, data: ticket });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async submitReply(req: Request, res: Response): Promise<void> {
    const { ticketId, userId, message, isStaff } = req.body as {
      ticketId: string;
      userId: string;
      message: string;
      isStaff: boolean;
    };

    try {
      const reply = await prisma.ticketReply.create({
        data: {
          ticketId,
          userId,
          message,
          isStaff: Boolean(isStaff),
        },
      });
      res.status(200).json({ success: true, data: reply });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Failed to record ticket comment." });
    }
  }
}
