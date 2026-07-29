import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 9. RELIEF ITEM SERVICES ====================
export const createReliefItem = async (payload: any) => {
  if (!payload.packageId || !payload.itemName || payload.quantity === undefined || !payload.unit) {
    throw new customError(status.BAD_REQUEST, "packageId, itemName, quantity, and unit are required.");
  }

  return await prisma.reliefItem.create({
    data: {
      packageId: payload.packageId,
      itemName: payload.itemName,
      quantity: Number(payload.quantity),
      unit: payload.unit,
      estimatedPrice: payload.estimatedPrice
        ? Number(payload.estimatedPrice)
        : 0.0,
    },
  });
};

export const getAllReliefItems = async (query?: { packageId?: string; search?: string }) => {
  const where: any = {};
  if (query?.packageId) where.packageId = query.packageId;
  if (query?.search) {
    where.itemName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.reliefItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReliefItemById = async (id: string) => {
  const item = await prisma.reliefItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief item not found.");
  }
  return item;
};

export const updateReliefItem = async (id: string, payload: any) => {
  const item = await prisma.reliefItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief item not found.");
  }

  return await prisma.reliefItem.update({
    where: { id },
    data: {
      ...(payload.itemName && { itemName: payload.itemName }),
      ...(payload.quantity !== undefined && { quantity: Number(payload.quantity) }),
      ...(payload.unit && { unit: payload.unit }),
      ...(payload.estimatedPrice !== undefined && { estimatedPrice: Number(payload.estimatedPrice) }),
    },
  });
};

export const deleteReliefItem = async (id: string) => {
  const item = await prisma.reliefItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief item not found.");
  }
  await prisma.reliefItem.delete({ where: { id } });
  return { message: "Relief item deleted successfully." };
};
