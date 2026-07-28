import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const assignRolePermission = async (payload: any) => {
  if (!payload.roleId || !payload.permissionId) {
    throw new customError(status.BAD_REQUEST, "roleId and permissionId are required.");
  }

  return await prisma.rolePermission.create({
    data: {
      roleId: payload.roleId,
      permissionId: payload.permissionId,
      canView: Boolean(payload.canView),
      canCreate: Boolean(payload.canCreate),
      canUpdate: Boolean(payload.canUpdate),
      canDelete: Boolean(payload.canDelete),
      canApprove: Boolean(payload.canApprove),
    },
  });
};

export const getAllRolePermissions = async (query?: { roleId?: string; permissionId?: string }) => {
  const where: any = {};
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.permissionId) where.permissionId = query.permissionId;

  return await prisma.rolePermission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getRolePermissionById = async (id: string) => {
  const rp = await prisma.rolePermission.findUnique({ where: { id } });
  if (!rp) {
    throw new customError(status.NOT_FOUND, "RolePermission assignment not found.");
  }
  return rp;
};

export const updateRolePermission = async (id: string, payload: any) => {
  const rp = await prisma.rolePermission.findUnique({ where: { id } });
  if (!rp) {
    throw new customError(status.NOT_FOUND, "RolePermission assignment not found.");
  }

  return await prisma.rolePermission.update({
    where: { id },
    data: {
      ...(payload.canView !== undefined && { canView: Boolean(payload.canView) }),
      ...(payload.canCreate !== undefined && { canCreate: Boolean(payload.canCreate) }),
      ...(payload.canUpdate !== undefined && { canUpdate: Boolean(payload.canUpdate) }),
      ...(payload.canDelete !== undefined && { canDelete: Boolean(payload.canDelete) }),
      ...(payload.canApprove !== undefined && { canApprove: Boolean(payload.canApprove) }),
    },
  });
};

export const deleteRolePermission = async (id: string) => {
  const rp = await prisma.rolePermission.findUnique({ where: { id } });
  if (!rp) {
    throw new customError(status.NOT_FOUND, "RolePermission assignment not found.");
  }
  await prisma.rolePermission.delete({ where: { id } });
  return { message: "RolePermission deleted successfully." };
};
