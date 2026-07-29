import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateKPI = async (id: string, payload: any) => {
  const item = await prisma.kPI.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "KPI not found.");
  }

  if (payload.name && payload.name !== item.name) {
    const existing = await prisma.kPI.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, `KPI '${payload.name}' already exists`);
    }
  }

  return await prisma.kPI.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.targetValue !== undefined && { targetValue: Number(payload.targetValue) }),
      ...(payload.currentValue !== undefined && { currentValue: Number(payload.currentValue) }),
      ...(payload.unit && { unit: payload.unit }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteKPI = async (id: string) => {
  const item = await prisma.kPI.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "KPI not found.");
  }
  await prisma.kPI.delete({ where: { id } });
  return { message: "KPI deleted successfully." };
};
