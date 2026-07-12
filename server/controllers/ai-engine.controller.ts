import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class AIEngineController {
  static async registerModelMetrics(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { modelName, modelType, algorithm, accuracy } = req.body as {
      modelName: string;
      modelType: string;
      algorithm: string;
      accuracy: number;
    };

    if (!modelName || !modelType || !algorithm) {
      res.status(400).json({
        success: false,
        error: "Missing core model validation metadata.",
      });
      return;
    }

    try {
      const modelNode = await prisma.aIModel.create({
        data: {
          modelName,
          modelType,
          algorithm,
          accuracy: parseFloat(accuracy.toString()) || 0.0,
          status: "ACTIVE",
        },
      });
      res.status(200).json({ success: true, data: modelNode });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async recordForecast(req: Request, res: Response): Promise<void> {
    const { category, forecastPeriod, predictedDemand, region } = req.body as {
      category: string;
      forecastPeriod: string;
      predictedDemand: number;
      region?: string;
    };

    try {
      const forecast = await prisma.demandForecast.create({
        data: {
          category,
          forecastPeriod,
          predictedDemand: parseFloat(predictedDemand.toString()),
          region,
        },
      });
      res.status(200).json({ success: true, data: forecast });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to record predictive telemetry.",
      });
    }
  }
}
