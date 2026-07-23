import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateCampaignCategoryPayload {
  name: string;
  icon?: string;
  description?: string;
  status?: string;
}

export interface UpdateCampaignCategoryPayload {
  name?: string;
  icon?: string;
  description?: string;
  status?: string;
}

const createCampaignCategory = async (payload: CreateCampaignCategoryPayload) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "Category name is required.");
  }

  const existing = await prisma.campaignCategory.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Campaign category with this name already exists.");
  }

  const category = await prisma.campaignCategory.create({
    data: {
      name: payload.name,
      icon: payload.icon || null,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });

  return category;
};

const getAllCampaignCategories = async (query?: { status?: string; search?: string }) => {
  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.name = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  const categories = await prisma.campaignCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { campaigns: true },
      },
    },
  });

  return categories;
};

const getCampaignCategoryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.campaignCategory.findUnique({
    where: { id },
    include: {
      campaigns: {
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          targetAmount: true,
          raisedAmount: true,
        },
      },
    },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Campaign category not found.");
  }

  return category;
};

const updateCampaignCategory = async (id: string, payload: UpdateCampaignCategoryPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.campaignCategory.findUnique({
    where: { id },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Campaign category not found.");
  }

  if (payload.name && payload.name !== category.name) {
    const existing = await prisma.campaignCategory.findUnique({
      where: { name: payload.name },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Campaign category with this name already exists.");
    }
  }

  const updatedCategory = await prisma.campaignCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.icon !== undefined && { icon: payload.icon }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedCategory;
};

const deleteCampaignCategory = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.campaignCategory.findUnique({
    where: { id },
    include: { _count: { select: { campaigns: true } } },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Campaign category not found.");
  }

  if (category._count.campaigns > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete category that has linked campaigns. Reassign or remove campaigns first."
    );
  }

  await prisma.campaignCategory.delete({
    where: { id },
  });

  return { message: "Campaign category deleted successfully." };
};

export const campaignCategoryService = {
  createCampaignCategory,
  getAllCampaignCategories,
  getCampaignCategoryById,
  updateCampaignCategory,
  deleteCampaignCategory,
};
