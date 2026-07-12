import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface AlertPayload {
  recipientId: string;
  type: string;
  title: string;
  body: string;
  priority?: string;
}

export class NotificationController {
  static async queueAlert(req: Request, res: Response): Promise<void> {
    const { recipientId, type, title, body, priority } =
      req.body as AlertPayload;

    if (!recipientId || !title || !body) {
      res
        .status(400)
        .json({ success: false, error: "Missing core payload fields." });
      return;
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const baseAlert = await tx.notification.create({
          data: {
            title,
            message: body,
            type,
            priority: priority || "NORMAL",
            status: "PENDING",
          },
        });

        await tx.notificationRecipient.create({
          data: {
            notificationId: baseAlert.id,
            userId: recipientId,
            status: "PENDING",
          },
        });

        return baseAlert;
      });

      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async getActiveAlerts(req: Request, res: Response): Promise<void> {
    const rawUser = req.params.userId;
    const targetUserId = Array.isArray(rawUser) ? rawUser[0] : rawUser;

    if (!targetUserId || typeof targetUserId !== "string") {
      res
        .status(400)
        .json({ success: false, error: "Invalid user parameter format." });
      return;
    }

    try {
      const logs = await prisma.notificationRecipient.findMany({
        where: { userId: targetUserId },
        include: { notification: true },
        orderBy: { createdAt: "desc" },
        take: 15,
      });
      res.status(200).json({ success: true, data: logs });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch alert history." });
    }
  }
}
