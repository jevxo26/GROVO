import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface BeneficiaryPayload {
  fullName: string;
  phone?: string;
  nationalId?: string;
  branchId: string;
  occupation?: string;
  monthlyIncome?: number;
}

export class BeneficiaryController {
  static async registerBeneficiary(req: Request, res: Response): Promise<void> {
    const { fullName, phone, nationalId, branchId, occupation, monthlyIncome } =
      req.body as BeneficiaryPayload;

    if (!fullName || !branchId) {
      res.status(400).json({
        success: false,
        error: "Full name and branch mapping required.",
      });
      return;
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const beneficiaryCode = `BEN-${Date.now()}`;
        const beneficiary = await tx.beneficiary.create({
          data: { beneficiaryCode, fullName, phone, nationalId, branchId },
        });

        await tx.beneficiaryProfile.create({
          data: {
            beneficiaryId: beneficiary.id,
            occupation: occupation || "Unemployed",
            monthlyIncome: monthlyIncome
              ? parseFloat(monthlyIncome.toString())
              : 0,
          },
        });
        return beneficiary;
      });

      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async logNeedAssessment(req: Request, res: Response): Promise<void> {
    const { beneficiaryId, type, priority, officerId } = req.body as {
      beneficiaryId: string;
      type: string;
      priority: string;
      officerId: string;
    };

    try {
      const assessment = await prisma.beneficiaryNeedAssessment.create({
        data: {
          beneficiaryId,
          assessmentType: type,
          priority,
          assessedBy: officerId,
          assessmentDate: new Date(),
        },
      });
      res.status(200).json({ success: true, data: assessment });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to record need assessment parameters.",
      });
    }
  }
}
