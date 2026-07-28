import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const createPermission = async (payload: any) => {
  if (!payload.permissionName || !payload.module) {
    throw new customError(status.BAD_REQUEST, "permissionName and module are required.");
  }

  const existing = await prisma.permission.findUnique({
    where: { permissionName: payload.permissionName },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Permission with this name already exists.");
  }

  return await prisma.permission.create({
    data: {
      permissionName: payload.permissionName,
      module: payload.module,
      description: payload.description || null,
    },
  });
};

export const getAllPermissions = async (query?: { module?: string; search?: string }) => {
  const where: any = {};
  if (query?.module) where.module = query.module;
  if (query?.search) {
    where.permissionName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.permission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getPermissionById = async (id: string) => {
  const permission = await prisma.permission.findUnique({ where: { id } });
  if (!permission) {
    throw new customError(status.NOT_FOUND, "Permission not found.");
  }
  return permission;
};

export const updatePermission = async (id: string, payload: any) => {
  const permission = await prisma.permission.findUnique({ where: { id } });
  if (!permission) {
    throw new customError(status.NOT_FOUND, "Permission not found.");
  }

  if (payload.permissionName && payload.permissionName !== permission.permissionName) {
    const existing = await prisma.permission.findUnique({ where: { permissionName: payload.permissionName } });
    if (existing) {
      throw new customError(status.CONFLICT, "Permission with this name already exists.");
    }
  }

  return await prisma.permission.update({
    where: { id },
    data: {
      ...(payload.permissionName && { permissionName: payload.permissionName }),
      ...(payload.module && { module: payload.module }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

export const deletePermission = async (id: string) => {
  const permission = await prisma.permission.findUnique({ where: { id } });
  if (!permission) {
    throw new customError(status.NOT_FOUND, "Permission not found.");
  }
  await prisma.permission.delete({ where: { id } });
  return { message: "Permission deleted successfully." };
};
