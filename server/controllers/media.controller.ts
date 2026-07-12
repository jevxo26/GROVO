import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface MediaPayload {
  title: string;
  description?: string;
  mediaType: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
}

export class MediaController {
  static async registerUpload(req: Request, res: Response): Promise<void> {
    const { title, description, mediaType, fileUrl, fileSize, uploadedBy } =
      req.body as MediaPayload;

    if (!title || !fileUrl || !uploadedBy) {
      res
        .status(400)
        .json({ success: false, error: "Missing core asset records." });
      return;
    }

    try {
      const asset = await prisma.media.create({
        data: {
          title,
          description,
          mediaType,
          fileUrl,
          fileSize: parseInt(fileSize.toString(), 10),
          uploadedBy,
          status: "ACTIVE",
        },
      });
      res.status(200).json({ success: true, data: asset });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async getUserAssets(req: Request, res: Response): Promise<void> {
    const rawUser = req.params.userId;
    const targetUserId = Array.isArray(rawUser) ? rawUser[0] : rawUser;

    if (!targetUserId || typeof targetUserId !== "string") {
      res
        .status(400)
        .json({ success: false, error: "Invalid user parameter format." });
      return;
    }

    try {
      const assets = await prisma.media.findMany({
        where: { uploadedBy: targetUserId, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json({ success: true, data: assets });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Failed to retrieve media assets." });
    }
  }
}
