import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const createAdminPermission = async (payload: any) => {
  if (!payload.adminId || !payload.module) {
    throw new customError(status.BAD_REQUEST, "adminId and module are required.");
  }

  return await prisma.adminPermission.create({
    data: {
      adminId: payload.adminId,
      module: payload.module,
      canView: Boolean(payload.canView),
      canCreate: Boolean(payload.canCreate),
      canUpdate: Boolean(payload.canUpdate),
      canDelete: Boolean(payload.canDelete),
      canApprove: Boolean(payload.canApprove),
      canExport: Boolean(payload.canExport),
    },
  });
};

export const getAllAdminPermissions = async (query?: { adminId?: string; module?: string }) => {
  const where: any = {};
  if (query?.adminId) where.adminId = query.adminId;
  if (query?.module) where.module = query.module;

  return await prisma.adminPermission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getAdminPermissionById = async (id: string) => {
  const ap = await prisma.adminPermission.findUnique({ where: { id } });
  if (!ap) {
    throw new customError(status.NOT_FOUND, "AdminPermission record not found.");
  }
  return ap;
};

export const updateAdminPermission = async (id: string, payload: any) => {
  const ap = await prisma.adminPermission.findUnique({ where: { id } });
  if (!ap) {
    throw new customError(status.NOT_FOUND, "AdminPermission record not found.");
  }

  return await prisma.adminPermission.update({
    where: { id },
    data: {
      ...(payload.module && { module: payload.module }),
      ...(payload.canView !== undefined && { canView: Boolean(payload.canView) }),
      ...(payload.canCreate !== undefined && { canCreate: Boolean(payload.canCreate) }),
      ...(payload.canUpdate !== undefined && { canUpdate: Boolean(payload.canUpdate) }),
      ...(payload.canDelete !== undefined && { canDelete: Boolean(payload.canDelete) }),
      ...(payload.canApprove !== undefined && { canApprove: Boolean(payload.canApprove) }),
      ...(payload.canExport !== undefined && { canExport: Boolean(payload.canExport) }),
    },
  });
};

export const deleteAdminPermission = async (id: string) => {
  const ap = await prisma.adminPermission.findUnique({ where: { id } });
  if (!ap) {
    throw new customError(status.NOT_FOUND, "AdminPermission record not found.");
  }
  await prisma.adminPermission.delete({ where: { id } });
  return { message: "AdminPermission record deleted successfully." };
};
