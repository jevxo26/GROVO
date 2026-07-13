import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class InventoryController {
  static async updateStock(req: Request, res: Response): Promise<void> {
    const { branchId, itemName, quantity, unit, location } = req.body as {
      branchId: string;
      itemName: string;
      quantity: number;
      unit: string;
      location?: string;
    };

    if (!branchId || !itemName || quantity < 0) {
      res.status(400).json({
        success: false,
        error: "Invalid asset criteria or negative counts.",
      });
      return;
    }

    try {
      const asset = await prisma.branchInventory.create({
        data: {
          branchId,
          itemName,
          quantity: parseInt(quantity.toString(), 10),
          unit,
          location,
          status: "AVAILABLE",
        },
      });
      res.status(200).json({ success: true, data: asset });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async logItemDistribution(req: Request, res: Response): Promise<void> {
    const { recordId, reliefItemId, quantity, remarks } = req.body as {
      recordId: string;
      reliefItemId: string;
      quantity: number;
      remarks?: string;
    };

    try {
      const trackingNode = await prisma.distributionItem.create({
        data: {
          distributionRecordId: recordId,
          reliefItemId,
          quantity: parseFloat(quantity.toString()),
          remarks,
        },
      });
      res.status(200).json({ success: true, data: trackingNode });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to balance asset release records.",
      });
    }
  }
}
