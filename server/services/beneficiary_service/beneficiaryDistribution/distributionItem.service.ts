import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 14. DISTRIBUTION ITEM SERVICES ====================
export const createDistributionItem = async (payload: any) => {
  if (!payload.distributionRecordId || !payload.reliefItemId || payload.quantity === undefined) {
    throw new customError(status.BAD_REQUEST, "distributionRecordId, reliefItemId, and quantity are required.");
  }

  return await prisma.distributionItem.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      reliefItemId: payload.reliefItemId,
      quantity: Number(payload.quantity),
      remarks: payload.remarks || null,
    },
  });
};

export const getAllDistributionItems = async (query?: { distributionRecordId?: string; reliefItemId?: string }) => {
  const where: any = {};
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;
  if (query?.reliefItemId) where.reliefItemId = query.reliefItemId;

  return await prisma.distributionItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDistributionItemById = async (id: string) => {
  const item = await prisma.distributionItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution item not found.");
  }
  return item;
};

export const updateDistributionItem = async (id: string, payload: any) => {
  const item = await prisma.distributionItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution item not found.");
  }

  return await prisma.distributionItem.update({
    where: { id },
    data: {
      ...(payload.reliefItemId && { reliefItemId: payload.reliefItemId }),
      ...(payload.quantity !== undefined && { quantity: Number(payload.quantity) }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

export const deleteDistributionItem = async (id: string) => {
  const item = await prisma.distributionItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution item not found.");
  }
  await prisma.distributionItem.delete({ where: { id } });
  return { message: "Distribution item deleted successfully." };
};
