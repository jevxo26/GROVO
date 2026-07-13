import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { CommitteeLevel } from "../../generated/prisma/enums";

interface CommitteePayload {
  branchId: string;
  committeeName: string;
  committeeLevel: CommitteeLevel;
  description?: string;
  formationDate: string;
}

export class GovernanceController {
  static async createCommittee(req: Request, res: Response): Promise<void> {
    const {
      branchId,
      committeeName,
      committeeLevel,
      description,
      formationDate,
    } = req.body as CommitteePayload;

    if (!branchId || !committeeName || !committeeLevel) {
      res
        .status(400)
        .json({ success: false, error: "Missing core committee parameters." });
      return;
    }

    try {
      const committee = await prisma.committee.create({
        data: {
          branchId,
          committeeName,
          committeeLevel,
          description,
          formationDate: new Date(formationDate),
          status: "ACTIVE",
        },
      });
      res.status(200).json({ success: true, data: committee });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async assignCommitteeMember(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { committeeId, memberId, designationId, joiningDate } = req.body as {
      committeeId: string;
      memberId: string;
      designationId: string;
      joiningDate: string;
    };

    try {
      const assignment = await prisma.committeeMember.create({
        data: {
          committeeId,
          memberId,
          designationId,
          joiningDate: new Date(joiningDate),
          status: "ACTIVE",
        },
      });
      res.status(200).json({ success: true, data: assignment });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to bind committee membership details.",
      });
    }
  }
}
