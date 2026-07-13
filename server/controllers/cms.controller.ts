import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface PagePayload {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDesc?: string;
  template?: string;
}

export class CMSController {
  static async createPage(req: Request, res: Response): Promise<void> {
    const { title, slug, metaTitle, metaDesc, template } =
      req.body as PagePayload;

    if (!title || !slug) {
      res.status(400).json({
        success: false,
        error: "Title and URL slug parameters required.",
      });
      return;
    }

    try {
      const page = await prisma.cMSPage.create({
        data: { title, slug, metaTitle, metaDesc, template, status: "DRAFT" },
      });
      res.status(200).json({ success: true, data: page });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ success: false, error: msg });
    }
  }

  static async publishImpactStory(req: Request, res: Response): Promise<void> {
    const { title, slug, content, beneficiaryId, campaignId, author } =
      req.body as {
        title: string;
        slug: string;
        content: string;
        beneficiaryId?: string;
        campaignId?: string;
        author: string;
      };

    if (!title || !slug || !content) {
      res.status(400).json({
        success: false,
        error: "Missing core publication parameters.",
      });
      return;
    }

    try {
      const story = await prisma.successStory.create({
        data: {
          title,
          slug,
          content,
          beneficiaryId,
          campaignId,
          publishedBy: author,
          status: "PUBLISHED",
          publishedAt: new Date(),
        },
      });
      res.status(200).json({ success: true, data: story });
    } catch (error: unknown) {
      res
        .status(500)
        .json({ success: false, error: "Failed to dispatch editorial story." });
    }
  }
}
