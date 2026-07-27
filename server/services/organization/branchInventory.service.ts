import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchInventoryPayload {
  branchId: string;
  itemName: string;
  quantity: number;
  unit?: string;
  condition?: string;
}

export interface UpdateBranchInventoryPayload {
  branchId?: string;
  itemName?: string;
  quantity?: number;
  unit?: string;
  condition?: string;
}

const createBranchInventory = async (payload: CreateBranchInventoryPayload) => {
  if (!payload.branchId || !payload.itemName || payload.quantity === undefined) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Item name, and Quantity are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchInventory.findFirst({
    where: {
      branchId: payload.branchId,
      itemName: payload.itemName,
      unit: payload.unit || null,
      condition: payload.condition || null,
    },
  });

  if (existing) {
    const updated = await prisma.branchInventory.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + payload.quantity,
      },
      include: {
        branch: { select: { id: true, branchName: true } },
      },
    });
    return updated;
  }

  const branchInventory = await prisma.branchInventory.create({
    data: {
      branchId: payload.branchId,
      itemName: payload.itemName,
      quantity: payload.quantity,
      unit: payload.unit || null,
      condition: payload.condition || null,
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchInventory;
};

const getAllBranchInventories = async (query?: { branchId?: string; search?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.search) {
    where.itemName = { contains: query.search, mode: "insensitive" };
  }

  const inventories = await prisma.branchInventory.findMany({
    where,
    orderBy: { itemName: "asc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return inventories;
};

const getBranchInventoryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Inventory ID is required.");
  }

  const inventory = await prisma.branchInventory.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!inventory) {
    throw new customError(status.NOT_FOUND, "Branch Inventory record not found.");
  }

  return inventory;
};

const updateBranchInventory = async (id: string, payload: UpdateBranchInventoryPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Inventory ID is required.");
  }

  const inventory = await prisma.branchInventory.findUnique({ where: { id } });
  if (!inventory) {
    throw new customError(status.NOT_FOUND, "Branch Inventory record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  const updated = await prisma.branchInventory.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.itemName && { itemName: payload.itemName }),
      ...(payload.quantity !== undefined && { quantity: payload.quantity }),
      ...(payload.unit !== undefined && { unit: payload.unit }),
      ...(payload.condition !== undefined && { condition: payload.condition }),
    },
  });

  return updated;
};

const deleteBranchInventory = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Inventory ID is required.");
  }

  const inventory = await prisma.branchInventory.findUnique({ where: { id } });
  if (!inventory) {
    throw new customError(status.NOT_FOUND, "Branch Inventory record not found.");
  }

  await prisma.branchInventory.delete({ where: { id } });

  return { message: "Branch Inventory record deleted successfully." };
};

export const branchInventoryService = {
  createBranchInventory,
  getAllBranchInventories,
  getBranchInventoryById,
  updateBranchInventory,
  deleteBranchInventory,
};
