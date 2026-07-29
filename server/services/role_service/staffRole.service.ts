import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const assignStaffRole = async (payload: any) => {
  if (!payload.staffId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "staffId and roleId are required.");
  }

  return await prisma.staffRole.create({
    data: {
      staffId: payload.staffId,
      roleId: payload.roleId,
      department: payload.department || null,
      designation: payload.designation || null,
      joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllStaffRoles = async (query?: { staffId?: string; roleId?: string; department?: string; status?: string }) => {
  const where: any = {};
  if (query?.staffId) where.staffId = query.staffId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.department) where.department = query.department;
  if (query?.status) where.status = query.status;

  return await prisma.staffRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getStaffRoleById = async (id: string) => {
  const sr = await prisma.staffRole.findUnique({ where: { id } });
  if (!sr) {
    throw new customError(status.NOT_FOUND, "StaffRole assignment not found.");
  }
  return sr;
};

export const updateStaffRole = async (id: string, payload: any) => {
  const sr = await prisma.staffRole.findUnique({ where: { id } });
  if (!sr) {
    throw new customError(status.NOT_FOUND, "StaffRole assignment not found.");
  }

  return await prisma.staffRole.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.department !== undefined && { department: payload.department }),
      ...(payload.designation !== undefined && { designation: payload.designation }),
      ...(payload.joiningDate && { joiningDate: new Date(payload.joiningDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteStaffRole = async (id: string) => {
  const sr = await prisma.staffRole.findUnique({ where: { id } });
  if (!sr) {
    throw new customError(status.NOT_FOUND, "StaffRole assignment not found.");
  }
  await prisma.staffRole.delete({ where: { id } });
  return { message: "StaffRole assignment deleted successfully." };
};
