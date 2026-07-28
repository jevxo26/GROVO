import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const assignUserRole = async (payload: any) => {
  if (!payload.userId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "userId and roleId are required.");
  }

  return await prisma.userRoleAssignment.create({
    data: {
      userId: payload.userId,
      roleId: payload.roleId,
      assignedBy: payload.assignedBy || null,
      assignedDate: payload.assignedDate ? new Date(payload.assignedDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllUserRoles = async (query?: { userId?: string; roleId?: string; status?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.status) where.status = query.status;

  return await prisma.userRoleAssignment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getUserRoleById = async (id: string) => {
  const ur = await prisma.userRoleAssignment.findUnique({ where: { id } });
  if (!ur) {
    throw new customError(status.NOT_FOUND, "UserRole assignment not found.");
  }
  return ur;
};

export const updateUserRole = async (id: string, payload: any) => {
  const ur = await prisma.userRoleAssignment.findUnique({ where: { id } });
  if (!ur) {
    throw new customError(status.NOT_FOUND, "UserRole assignment not found.");
  }

  return await prisma.userRoleAssignment.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.assignedBy !== undefined && { assignedBy: payload.assignedBy }),
      ...(payload.assignedDate && { assignedDate: new Date(payload.assignedDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteUserRole = async (id: string) => {
  const ur = await prisma.userRoleAssignment.findUnique({ where: { id } });
  if (!ur) {
    throw new customError(status.NOT_FOUND, "UserRole assignment not found.");
  }
  await prisma.userRoleAssignment.delete({ where: { id } });
  return { message: "UserRole assignment deleted successfully." };
};
