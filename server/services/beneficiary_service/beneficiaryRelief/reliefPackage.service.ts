import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 8. RELIEF PACKAGE SERVICES ====================
export const createReliefPackage = async (payload: any) => {
  if (!payload.packageName) {
    throw new customError(status.BAD_REQUEST, "packageName is required.");
  }

  return await prisma.reliefPackage.create({
    data: {
      packageName: payload.packageName,
      description: payload.description || null,
      estimatedValue: payload.estimatedValue
        ? Number(payload.estimatedValue)
        : 0.0,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllReliefPackages = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.packageName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.reliefPackage.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getReliefPackageById = async (id: string) => {
  const item = await prisma.reliefPackage.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief package not found.");
  }
  return item;
};

export const updateReliefPackage = async (id: string, payload: any) => {
  const item = await prisma.reliefPackage.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief package not found.");
  }

  return await prisma.reliefPackage.update({
    where: { id },
    data: {
      ...(payload.packageName && { packageName: payload.packageName }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.estimatedValue !== undefined && { estimatedValue: Number(payload.estimatedValue) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteReliefPackage = async (id: string) => {
  const item = await prisma.reliefPackage.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief package not found.");
  }
  await prisma.reliefPackage.delete({ where: { id } });
  return { message: "Relief package deleted successfully." };
};
