import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 4. KPI SERVICES ====================
export const createKPI = async (payload: any) => {
  if (!payload.name || payload.targetValue === undefined || !payload.unit) {
    throw new customError(status.BAD_REQUEST, "name, targetValue, and unit are required.");
  }

  const existing = await prisma.kPI.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `KPI '${payload.name}' already exists`);
  }

  return await prisma.kPI.create({
    data: {
      name: payload.name,
      description: payload.description || null,
      targetValue: Number(payload.targetValue),
      currentValue: payload.currentValue ? Number(payload.currentValue) : 0,
      unit: payload.unit,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllKPIs = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.name = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.kPI.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getKPIById = async (id: string) => {
  const item = await prisma.kPI.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "KPI not found.");
  }
  return item;
};

