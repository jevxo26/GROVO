import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface DonationPayload {
  donorId: string;
  amount: string | number;
  campaignId?: string;
  paymentMethod: string;
  transactionId: string;
}

export class DonationController {
  static async processDonation(req: Request, res: Response): Promise<void> {
    const { donorId, amount, campaignId, paymentMethod, transactionId } =
      req.body as DonationPayload;

    if (!donorId || !amount || !paymentMethod || !transactionId) {
      res
        .status(400)
        .json({ success: false, error: "Missing required parameters." });
      return;
    }

    try {
      const parsedAmount =
        typeof amount === "string" ? parseFloat(amount) : amount;
      const result = await prisma.$transaction(async (tx) => {
        const donationNumber = `DN-${Date.now()}`;

        const donation = await tx.donation.create({
          data: {
            donationNumber,
            donorId,
            amount: parsedAmount,
            campaignId,
            donationTypeId: "SYSTEM_DIRECT",
            categoryId: "GENERAL_FUND",
            paymentStatus: "COMPLETED",
          },
        });

        await tx.payment.create({
          data: {
            donationId: donation.id,
            paymentMethod,
            amount: parsedAmount,
            transactionId,
            paymentStatus: "SUCCESS",
            paymentGatewayId: "GATEWAY_PRIMARY",
          },
        });

        return donation;
      });

      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: errMsg });
    }
  }
}
