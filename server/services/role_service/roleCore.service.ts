import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const createRole = async (payload: any) => {
  if (!payload.roleName || !payload.displayName) {
    throw new customError(status.BAD_REQUEST, "roleName and displayName are required.");
  }

  const existingRole = await prisma.role.findUnique({
    where: { roleName: payload.roleName },
  });

  if (existingRole) {
    throw new customError(
      status.CONFLICT,
      `Role with name '${payload.roleName}' already exists`
    );
  }

  return await prisma.role.create({
    data: {
      roleName: payload.roleName,
      displayName: payload.displayName,
      description: payload.description || null,
      roleType: payload.roleType || "CUSTOM",
      priority: payload.priority ? Number(payload.priority) : 0,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllRoles = async (query?: { roleType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.roleType) where.roleType = query.roleType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { roleName: { contains: query.search, mode: "insensitive" } },
      { displayName: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.role.findMany({
    where,
    orderBy: { priority: "asc" },
  });
};

export const getRoleById = async (id: string) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new customError(status.NOT_FOUND, "Role not found.");
  }
  return role;
};

export const updateRole = async (id: string, payload: any) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new customError(status.NOT_FOUND, "Role not found.");
  }

  if (payload.roleName && payload.roleName !== role.roleName) {
    const existing = await prisma.role.findUnique({ where: { roleName: payload.roleName } });
    if (existing) {
      throw new customError(status.CONFLICT, `Role with name '${payload.roleName}' already exists.`);
    }
  }

  return await prisma.role.update({
    where: { id },
    data: {
      ...(payload.roleName && { roleName: payload.roleName }),
      ...(payload.displayName && { displayName: payload.displayName }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.roleType && { roleType: payload.roleType }),
      ...(payload.priority !== undefined && { priority: Number(payload.priority) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteRole = async (id: string) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new customError(status.NOT_FOUND, "Role not found.");
  }
  await prisma.role.delete({ where: { id } });
  return { message: "Role deleted successfully." };
};
