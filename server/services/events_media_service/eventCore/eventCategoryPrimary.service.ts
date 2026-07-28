import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 2. EVENT CATEGORY SERVICES ====================
export const createEventCategory = async (payload: any) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "name is required.");
  }

  const existing = await prisma.eventCategory.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Category '${payload.name}' already exists`);
  }

  return await prisma.eventCategory.create({
    data: {
      name: payload.name,
      icon: payload.icon || null,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllEventCategories = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.eventCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventCategoryById = async (id: string) => {
  const item = await prisma.eventCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event category not found.");
  }
  return item;
};

