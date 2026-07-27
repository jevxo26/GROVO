import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchTypePayload {
  name: string;
  description?: string;
  status?: string;
}

export interface UpdateBranchTypePayload {
  name?: string;
  description?: string;
  status?: string;
}

const createBranchType = async (payload: CreateBranchTypePayload) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "Branch type name is required.");
  }

  const existing = await prisma.branchType.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Branch type with this name already exists.");
  }

  const branchType = await prisma.branchType.create({
    data: {
      name: payload.name,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });

  return branchType;
};

const getAllBranchTypes = async (query?: { status?: string; search?: string }) => {
  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const branchTypes = await prisma.branchType.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          branches: true,
        },
      },
    },
  });

  return branchTypes;
};

const getBranchTypeById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch type ID is required.");
  }

  const branchType = await prisma.branchType.findUnique({
    where: { id },
    include: {
      branches: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  if (!branchType) {
    throw new customError(status.NOT_FOUND, "Branch type not found.");
  }

  return branchType;
};

const updateBranchType = async (id: string, payload: UpdateBranchTypePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch type ID is required.");
  }

  const branchType = await prisma.branchType.findUnique({
    where: { id },
  });

  if (!branchType) {
    throw new customError(status.NOT_FOUND, "Branch type not found.");
  }

  if (payload.name && payload.name !== branchType.name) {
    const existing = await prisma.branchType.findUnique({
      where: { name: payload.name },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Branch type with this name already exists.");
    }
  }

  const updated = await prisma.branchType.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchType = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch type ID is required.");
  }

  const branchType = await prisma.branchType.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          branches: true,
        },
      },
    },
  });

  if (!branchType) {
    throw new customError(status.NOT_FOUND, "Branch type not found.");
  }

  if (branchType._count.branches > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete branch type because active branches are linked to it."
    );
  }

  await prisma.branchType.delete({
    where: { id },
  });

  return { message: "Branch type deleted successfully." };
};

export const branchTypeService = {
  createBranchType,
  getAllBranchTypes,
  getBranchTypeById,
  updateBranchType,
  deleteBranchType,
};
