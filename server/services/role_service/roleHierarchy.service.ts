import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const createRoleHierarchy = async (payload: any) => {
  if (!payload.parentRoleId || !payload.childRoleId) {
    throw new customError(status.BAD_REQUEST, "parentRoleId and childRoleId are required.");
  }

  return await prisma.roleHierarchy.create({
    data: {
      parentRoleId: payload.parentRoleId,
      childRoleId: payload.childRoleId,
      hierarchyLevel: payload.hierarchyLevel ? Number(payload.hierarchyLevel) : 1,
    },
  });
};

export const getAllRoleHierarchies = async (query?: { parentRoleId?: string; childRoleId?: string }) => {
  const where: any = {};
  if (query?.parentRoleId) where.parentRoleId = query.parentRoleId;
  if (query?.childRoleId) where.childRoleId = query.childRoleId;

  return await prisma.roleHierarchy.findMany({
    where,
    orderBy: { hierarchyLevel: "asc" },
  });
};

export const getRoleHierarchyById = async (id: string) => {
  const rh = await prisma.roleHierarchy.findUnique({ where: { id } });
  if (!rh) {
    throw new customError(status.NOT_FOUND, "RoleHierarchy record not found.");
  }
  return rh;
};

export const updateRoleHierarchy = async (id: string, payload: any) => {
  const rh = await prisma.roleHierarchy.findUnique({ where: { id } });
  if (!rh) {
    throw new customError(status.NOT_FOUND, "RoleHierarchy record not found.");
  }

  return await prisma.roleHierarchy.update({
    where: { id },
    data: {
      ...(payload.parentRoleId && { parentRoleId: payload.parentRoleId }),
      ...(payload.childRoleId && { childRoleId: payload.childRoleId }),
      ...(payload.hierarchyLevel !== undefined && { hierarchyLevel: Number(payload.hierarchyLevel) }),
    },
  });
};

export const deleteRoleHierarchy = async (id: string) => {
  const rh = await prisma.roleHierarchy.findUnique({ where: { id } });
  if (!rh) {
    throw new customError(status.NOT_FOUND, "RoleHierarchy record not found.");
  }
  await prisma.roleHierarchy.delete({ where: { id } });
  return { message: "RoleHierarchy record deleted successfully." };
};
