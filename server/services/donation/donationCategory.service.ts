import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDonationCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
  status?: string;
}

export interface UpdateDonationCategoryPayload {
  name?: string;
  description?: string;
  icon?: string;
  status?: string;
}

const createDonationCategory = async (payload: CreateDonationCategoryPayload) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "Category name is required.");
  }

  const existing = await prisma.donationCategory.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Donation category with this name already exists.");
  }

  const category = await prisma.donationCategory.create({
    data: {
      name: payload.name,
      description: payload.description || null,
      icon: payload.icon || null,
      status: payload.status || "ACTIVE",
    },
  });

  return category;
};

const getAllDonationCategories = async (query?: { status?: string; search?: string }) => {
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

  const categories = await prisma.donationCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { donations: true },
      },
    },
  });

  return categories;
};

const getDonationCategoryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.donationCategory.findUnique({
    where: { id },
    include: {
      donations: {
        select: {
          id: true,
          donationNumber: true,
          amount: true,
          currency: true,
          paymentStatus: true,
          createdAt: true,
        },
      },
    },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Donation category not found.");
  }

  return category;
};

const updateDonationCategory = async (id: string, payload: UpdateDonationCategoryPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.donationCategory.findUnique({
    where: { id },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Donation category not found.");
  }

  if (payload.name && payload.name !== category.name) {
    const existing = await prisma.donationCategory.findUnique({
      where: { name: payload.name },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Donation category with this name already exists.");
    }
  }

  const updatedCategory = await prisma.donationCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.icon !== undefined && { icon: payload.icon }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedCategory;
};

const deleteDonationCategory = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.donationCategory.findUnique({
    where: { id },
    include: { _count: { select: { donations: true } } },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Donation category not found.");
  }

  if (category._count.donations > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete category that has linked donations. Reassign or remove donations first."
    );
  }

  await prisma.donationCategory.delete({
    where: { id },
  });

  return { message: "Donation category deleted successfully." };
};

export const donationCategoryService = {
  createDonationCategory,
  getAllDonationCategories,
  getDonationCategoryById,
  updateDonationCategory,
  deleteDonationCategory,
};
