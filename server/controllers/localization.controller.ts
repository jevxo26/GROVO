import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class LocalizationController {
  static async updateExchangeRate(req: Request, res: Response): Promise<void> {
    const { currencyCode, exchangeRate } = req.body as {
      currencyCode: string;
      exchangeRate: number;
    };

    if (!currencyCode || exchangeRate <= 0) {
      res
        .status(400)
        .json({ success: false, error: "Invalid conversion parameters." });
      return;
    }

    try {
      const entry = await prisma.currency.update({
        where: { currencyCode },
        data: { exchangeRate: parseFloat(exchangeRate.toString()) },
      });
      res.status(200).json({ success: true, data: entry });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async setTranslationKey(req: Request, res: Response): Promise<void> {
    const { languageId, key, value, moduleName } = req.body as {
      languageId: string;
      key: string;
      value: string;
      moduleName?: string;
    };

    try {
      const entry = await prisma.translation.upsert({
        where: { languageId_key: { languageId, key } },
        update: { value, updatedAt: new Date() },
        create: { languageId, key, value, module: moduleName },
      });
      res.status(200).json({ success: true, data: entry });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to balance localization maps.",
      });
    }
  }
}
