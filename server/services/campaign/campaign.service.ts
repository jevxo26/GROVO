import status from "http-status";
import { CampaignStatus, CampaignType } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateCampaignPayload {
  title: string;
  categoryId: string;
  description: string;
  shortDescription?: string;
  campaignType: CampaignType;
  targetAmount: number;
  startDate: string | Date;
  endDate?: string | Date;
  thumbnail?: string;
  banner?: string;
  status?: CampaignStatus;
}

export interface UpdateCampaignPayload {
  title?: string;
  categoryId?: string;
  description?: string;
  shortDescription?: string;
  campaignType?: CampaignType;
  targetAmount?: number;
  startDate?: string | Date;
  endDate?: string | Date;
  thumbnail?: string;
  banner?: string;
  status?: CampaignStatus;
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const generateCampaignCode = async (): Promise<string> => {
  const year = new Date().getFullYear();
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    code = `CMP-${year}-${randomDigits}`;
    const existing = await prisma.campaign.findUnique({
      where: { campaignCode: code },
    });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

const createCampaign = async (createdBy: string | undefined, payload: CreateCampaignPayload) => {
  if (!payload.title || !payload.categoryId || !payload.description || !payload.campaignType || !payload.targetAmount || !payload.startDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: title, categoryId, description, campaignType, targetAmount, startDate.");
  }

  const category = await prisma.campaignCategory.findUnique({
    where: { id: payload.categoryId },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Campaign category not found.");
  }

  const campaignCode = await generateCampaignCode();
  let slug = generateSlug(payload.title);

  // Ensure unique slug
  const existingSlug = await prisma.campaign.findUnique({ where: { slug } });
  if (existingSlug) {
    slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const campaign = await prisma.campaign.create({
    data: {
      campaignCode,
      title: payload.title,
      slug,
      categoryId: payload.categoryId,
      description: payload.description,
      shortDescription: payload.shortDescription || null,
      campaignType: payload.campaignType,
      targetAmount: payload.targetAmount,
      raisedAmount: 0,
      startDate: new Date(payload.startDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      thumbnail: payload.thumbnail || null,
      banner: payload.banner || null,
      status: payload.status || CampaignStatus.DRAFT,
      createdBy: createdBy || null,
    },
    include: {
      category: true,
    },
  });

  return campaign;
};

const getAllCampaigns = async (query?: {
  categoryId?: string;
  campaignType?: CampaignType;
  status?: CampaignStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query?.campaignType) {
    where.campaignType = query.campaignType;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { campaignCode: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [campaigns, total] = await Promise.all([
    prisma.campaign.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { id: true, name: true, icon: true },
        },
        _count: {
          select: { donations: true, projects: true, goals: true },
        },
      },
    }),
    prisma.campaign.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: campaigns,
  };
};

const getCampaignById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      category: true,
      goals: true,
      milestones: true,
      media: true,
      emergencyDetails: true,
      projects: {
        select: {
          id: true,
          projectCode: true,
          projectName: true,
          status: true,
        },
      },
      _count: {
        select: { donations: true },
      },
    },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  const progressPercentage = campaign.targetAmount > 0
    ? Math.min(100, (campaign.raisedAmount / campaign.targetAmount) * 100)
    : 0;

  return {
    ...campaign,
    progressPercentage: Number(progressPercentage.toFixed(2)),
  };
};

const getCampaignBySlug = async (slug: string) => {
  if (!slug) {
    throw new customError(status.BAD_REQUEST, "Campaign slug is required.");
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
        select: { donations: true },
      },
    },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  const progressPercentage = campaign.targetAmount > 0
    ? Math.min(100, (campaign.raisedAmount / campaign.targetAmount) * 100)
    : 0;

  return {
    ...campaign,
    progressPercentage: Number(progressPercentage.toFixed(2)),
  };
};

const updateCampaign = async (id: string, payload: UpdateCampaignPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  if (payload.categoryId) {
    const category = await prisma.campaignCategory.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category) {
      throw new customError(status.NOT_FOUND, "Campaign category not found.");
    }
  }

  let slug = campaign.slug;
  if (payload.title && payload.title !== campaign.title) {
    slug = generateSlug(payload.title);
    const existingSlug = await prisma.campaign.findFirst({
      where: { slug, id: { not: id } },
    });
    if (existingSlug) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }
  }

  const updatedCampaign = await prisma.campaign.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title, slug }),
      ...(payload.categoryId && { categoryId: payload.categoryId }),
      ...(payload.description && { description: payload.description }),
      ...(payload.shortDescription !== undefined && { shortDescription: payload.shortDescription }),
      ...(payload.campaignType && { campaignType: payload.campaignType }),
      ...(payload.targetAmount !== undefined && { targetAmount: payload.targetAmount }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.thumbnail !== undefined && { thumbnail: payload.thumbnail }),
      ...(payload.banner !== undefined && { banner: payload.banner }),
      ...(payload.status && { status: payload.status }),
    },
    include: {
      category: true,
    },
  });

  return updatedCampaign;
};

const deleteCampaign = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      _count: { select: { donations: true, projects: true } },
    },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  if (campaign._count.donations > 0 || campaign._count.projects > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete campaign with existing donations or linked projects. Consider setting status to CANCELLED instead."
    );
  }

  await prisma.campaign.delete({
    where: { id },
  });

  return { message: "Campaign deleted successfully." };
};

const getCampaignStats = async () => {
  const [totalCampaigns, activeCampaigns, completedCampaigns, aggregate] = await Promise.all([
    prisma.campaign.count(),
    prisma.campaign.count({ where: { status: CampaignStatus.ACTIVE } }),
    prisma.campaign.count({ where: { status: CampaignStatus.COMPLETED } }),
    prisma.campaign.aggregate({
      _sum: {
        targetAmount: true,
        raisedAmount: true,
      },
    }),
  ]);

  return {
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
    totalTargetAmount: aggregate._sum.targetAmount || 0,
    totalRaisedAmount: aggregate._sum.raisedAmount || 0,
  };
};

export const campaignService = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  getCampaignBySlug,
  updateCampaign,
  deleteCampaign,
  getCampaignStats,
};
