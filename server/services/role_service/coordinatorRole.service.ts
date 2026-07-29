import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const assignCoordinatorRole = async (payload: any) => {
  if (!payload.coordinatorId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "coordinatorId and roleId are required.");
  }

  return await prisma.coordinatorRole.create({
    data: {
      coordinatorId: payload.coordinatorId,
      roleId: payload.roleId,
      organizationLevel: payload.organizationLevel || null,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      assignedDate: payload.assignedDate ? new Date(payload.assignedDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllCoordinatorRoles = async (query?: { coordinatorId?: string; roleId?: string; organizationLevel?: string; status?: string }) => {
  const where: any = {};
  if (query?.coordinatorId) where.coordinatorId = query.coordinatorId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.organizationLevel) where.organizationLevel = query.organizationLevel;
  if (query?.status) where.status = query.status;

  return await prisma.coordinatorRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getCoordinatorRoleById = async (id: string) => {
  const cr = await prisma.coordinatorRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CoordinatorRole assignment not found.");
  }
  return cr;
};

export const updateCoordinatorRole = async (id: string, payload: any) => {
  const cr = await prisma.coordinatorRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CoordinatorRole assignment not found.");
  }

  return await prisma.coordinatorRole.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.organizationLevel !== undefined && { organizationLevel: payload.organizationLevel }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.assignedDate && { assignedDate: new Date(payload.assignedDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteCoordinatorRole = async (id: string) => {
  const cr = await prisma.coordinatorRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CoordinatorRole assignment not found.");
  }
  await prisma.coordinatorRole.delete({ where: { id } });
  return { message: "CoordinatorRole assignment deleted successfully." };
};
