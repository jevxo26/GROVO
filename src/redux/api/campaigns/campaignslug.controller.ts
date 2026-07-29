import { Request, Response } from "express";
import { prisma } from "../../../../server/lib/prisma";

export const getCampaignBySlug = async (req: Request, res: Response) => {
  try {
    let { slug } = req.params;

    // ✅ Fix: ensure slug is string
    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        message: "Invalid slug",
      });
    }

    const campaign = await prisma.campaign.findUnique({
      where: { slug },
      include: {
        category: true,
        goals: true,
        milestones: true,
        media: true,
        emergencyDetails: true,
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    // ✅ Not found
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // ✅ Progress calculation (safe)
    const progressPercentage =
      campaign.targetAmount > 0
        ? Math.round(
            (campaign.raisedAmount / campaign.targetAmount) * 100
          )
        : 0;

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Campaign fetched successfully",
      data: {
        ...campaign,
        progressPercentage,
      },
    });
  } catch (error: any) {
    console.error("Get Campaign Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch campaign",
      error: error?.message || "Internal Server Error",
    });
  }
};