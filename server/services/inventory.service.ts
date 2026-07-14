import { prisma } from "../lib/prisma";

const updateStock = async (payload: {
  branchId: string;
  itemName: string;
  quantity: number;
  unit: string;
  location?: string;
}) => {
  return await prisma.branchInventory.create({
    data: {
      branchId: payload.branchId,
      itemName: payload.itemName,
      quantity: parseInt(payload.quantity.toString(), 10),
      unit: payload.unit,
      location: payload.location,
      status: "AVAILABLE",
    },
  });
};

const logItemDistribution = async (payload: {
  recordId: string;
  reliefItemId: string;
  quantity: number;
  remarks?: string;
}) => {
  return await prisma.distributionItem.create({
    data: {
      distributionRecordId: payload.recordId,
      reliefItemId: payload.reliefItemId,
      quantity: parseFloat(payload.quantity.toString()),
      remarks: payload.remarks,
    },
  });
};

export const inventoryService = {
  updateStock,
  logItemDistribution,
};
