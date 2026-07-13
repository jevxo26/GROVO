import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface PredictionPayload {
  donorId?: string;
  campaignId?: string;
  predictedAmount: number;
  confidenceScore: number;
  algorithm: string;
}

export class AIAutomationController {
  static async logPrediction(req: Request, res: Response): Promise<void> {
    const { donorId, campaignId, predictedAmount, confidenceScore, algorithm } =
      req.body as PredictionPayload;

    if (!predictedAmount || !confidenceScore) {
      res
        .status(400)
        .json({ success: false, error: "Missing predictive tracking fields." });
      return;
    }

    try {
      const prediction = await prisma.donationPrediction.create({
        data: {
          donorId,
          campaignId,
          predictedAmount: parseFloat(predictedAmount.toString()),
          confidenceScore: parseFloat(confidenceScore.toString()),
          algorithm,
          status: "ACTIVE",
        },
      });

      res.status(200).json({ success: true, data: prediction });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async queueAutomatedTask(req: Request, res: Response): Promise<void> {
    const { name, type, scheduleTime, payload } = req.body as {
      name: string;
      type: string;
      scheduleTime: string;
      payload?: string;
    };

    try {
      const task = await prisma.autoTask.create({
        data: {
          taskName: name,
          taskType: type,
          scheduledAt: new Date(scheduleTime),
          status: "PENDING",
          payload,
        },
      });
      res.status(200).json({ success: true, data: task });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to queue automatic workflow task.",
      });
    }
  }
}
