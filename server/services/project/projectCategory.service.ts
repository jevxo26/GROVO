import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectCategoryPayload {
  name: string;
  description?: string;
  status?: string;
}

export interface UpdateProjectCategoryPayload {
  name?: string;
  description?: string;
  status?: string;
}

const createProjectCategory = async (payload: CreateProjectCategoryPayload) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "Project category name is required.");
  }

  const existing = await prisma.projectCategory.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Project category with this name already exists.");
  }

  const category = await prisma.projectCategory.create({
    data: {
      name: payload.name,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });

  return category;
};

const getAllProjectCategories = async (query?: { status?: string; search?: string }) => {
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

  const categories = await prisma.projectCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });

  return categories;
};

const getProjectCategoryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.projectCategory.findUnique({
    where: { id },
    include: {
      projects: {
        select: {
          id: true,
          projectCode: true,
          projectName: true,
          status: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Project category not found.");
  }

  return category;
};

const updateProjectCategory = async (id: string, payload: UpdateProjectCategoryPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.projectCategory.findUnique({
    where: { id },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Project category not found.");
  }

  if (payload.name && payload.name !== category.name) {
    const existing = await prisma.projectCategory.findUnique({
      where: { name: payload.name },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Project category with this name already exists.");
    }
  }

  const updatedCategory = await prisma.projectCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedCategory;
};

const deleteProjectCategory = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Category ID is required.");
  }

  const category = await prisma.projectCategory.findUnique({
    where: { id },
    include: { _count: { select: { projects: true } } },
  });

  if (!category) {
    throw new customError(status.NOT_FOUND, "Project category not found.");
  }

  if (category._count.projects > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete category that has linked projects. Reassign or remove projects first."
    );
  }

  await prisma.projectCategory.delete({
    where: { id },
  });

  return { message: "Project category deleted successfully." };
};

export const projectCategoryService = {
  createProjectCategory,
  getAllProjectCategories,
  getProjectCategoryById,
  updateProjectCategory,
  deleteProjectCategory,
};
