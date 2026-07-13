import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class FinancialController {
  static async transferCapital(req: Request, res: Response): Promise<void> {
    const { fromFundId, toFundId, amount, reason, approvedBy } = req.body as {
      fromFundId: string;
      toFundId: string;
      amount: number;
      reason?: string;
      approvedBy?: string;
    };

    if (!fromFundId || !toFundId || amount <= 0) {
      res
        .status(400)
        .json({ success: false, error: "Invalid transfer boundaries." });
      return;
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const source = await tx.fund.update({
          where: { id: fromFundId },
          data: { currentBalance: { decrement: amount } },
        });

        if (source.currentBalance < 0) {
          throw new Error("INSUFFICIENT_FUND_LIQUIDITY");
        }

        await tx.fund.update({
          where: { id: toFundId },
          data: { currentBalance: { increment: amount } },
        });

        return await tx.fundTransfer.create({
          data: { fromFundId, toFundId, amount, reason, approvedBy },
        });
      });

      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Transaction Fault";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async verifyTransaction(req: Request, res: Response): Promise<void> {
    const { paymentId, gatewayTxId, status, amount } = req.body as {
      paymentId: string;
      gatewayTxId: string;
      status: string;
      amount: number;
    };

    try {
      const txRecord = await prisma.paymentTransaction.create({
        data: {
          paymentId,
          gatewayTransactionId: gatewayTxId,
          amount,
          status,
        },
      });

      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          paymentStatus: status,
          paidAt: status === "SUCCESS" ? new Date() : null,
        },
      });

      res.status(200).json({ success: true, data: txRecord });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Payment state update failed." });
    }
  }
}
