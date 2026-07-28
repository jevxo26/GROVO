import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const assignVolunteerRole = async (payload: any) => {
  if (!payload.volunteerId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "volunteerId and roleId are required.");
  }

  return await prisma.volunteerRole.create({
    data: {
      volunteerId: payload.volunteerId,
      roleId: payload.roleId,
      assignedArea: payload.assignedArea || null,
      responsibility: payload.responsibility || null,
      startDate: payload.startDate ? new Date(payload.startDate) : new Date(),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllVolunteerRoles = async (query?: { volunteerId?: string; roleId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerRoleById = async (id: string) => {
  const vr = await prisma.volunteerRole.findUnique({ where: { id } });
  if (!vr) {
    throw new customError(status.NOT_FOUND, "VolunteerRole assignment not found.");
  }
  return vr;
};

export const updateVolunteerRole = async (id: string, payload: any) => {
  const vr = await prisma.volunteerRole.findUnique({ where: { id } });
  if (!vr) {
    throw new customError(status.NOT_FOUND, "VolunteerRole assignment not found.");
  }

  return await prisma.volunteerRole.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.assignedArea !== undefined && { assignedArea: payload.assignedArea }),
      ...(payload.responsibility !== undefined && { responsibility: payload.responsibility }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteerRole = async (id: string) => {
  const vr = await prisma.volunteerRole.findUnique({ where: { id } });
  if (!vr) {
    throw new customError(status.NOT_FOUND, "VolunteerRole assignment not found.");
  }
  await prisma.volunteerRole.delete({ where: { id } });
  return { message: "VolunteerRole assignment deleted successfully." };
};
