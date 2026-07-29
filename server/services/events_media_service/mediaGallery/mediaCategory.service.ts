import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 11. MEDIA CATEGORY SERVICES ====================
export const createMediaCategory = async (payload: any) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "name is required.");
  }

  const existing = await prisma.mediaCategory.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Media category '${payload.name}' already exists`);
  }

  return await prisma.mediaCategory.create({
    data: {
      name: payload.name,
      description: payload.description || null,
    },
  });
};

export const getAllMediaCategories = async () => {
  return await prisma.mediaCategory.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getMediaCategoryById = async (id: string) => {
  const item = await prisma.mediaCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media category not found.");
  }
  return item;
};

export const updateMediaCategory = async (id: string, payload: any) => {
  const item = await prisma.mediaCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media category not found.");
  }

  if (payload.name && payload.name !== item.name) {
    const existing = await prisma.mediaCategory.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, `Media category '${payload.name}' already exists`);
    }
  }

  return await prisma.mediaCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

export const deleteMediaCategory = async (id: string) => {
  const item = await prisma.mediaCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media category not found.");
  }
  await prisma.mediaCategory.delete({ where: { id } });
  return { message: "Media category deleted successfully." };
};
