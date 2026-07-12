import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class SecurityController {
  static async whitelistIp(req: Request, res: Response): Promise<void> {
    const { ipAddress, description, addedBy } = req.body as {
      ipAddress: string;
      description?: string;
      addedBy: string;
    };

    if (!ipAddress || !addedBy) {
      res.status(400).json({
        success: false,
        error: "IP address and security anchor author required.",
      });
      return;
    }

    try {
      const entry = await prisma.iPWhitelist.create({
        data: { ipAddress, description, addedBy, isActive: true },
      });
      res.status(200).json({ success: true, data: entry });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async flagIncident(req: Request, res: Response): Promise<void> {
    const { incidentType, severity, description, affectedArea } = req.body as {
      incidentType: string;
      severity: string;
      description: string;
      affectedArea?: string;
    };

    try {
      const incident = await prisma.securityIncident.create({
        data: {
          incidentType,
          severity,
          description,
          affectedArea,
          status: "OPEN",
        },
      });
      res.status(200).json({ success: true, data: incident });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: "Failed to record security incident parameter.",
      });
    }
  }
}
