import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const assignCommitteeRole = async (payload: any) => {
  if (!payload.committeeId || !payload.memberId || !payload.role) {
    throw new customError(status.BAD_REQUEST, "committeeId, memberId, and role are required.");
  }

  return await prisma.committeeRole.create({
    data: {
      committeeId: payload.committeeId,
      memberId: payload.memberId,
      role: payload.role,
      startDate: payload.startDate ? new Date(payload.startDate) : new Date(),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllCommitteeRoles = async (query?: { committeeId?: string; memberId?: string; role?: string; status?: string }) => {
  const where: any = {};
  if (query?.committeeId) where.committeeId = query.committeeId;
  if (query?.memberId) where.memberId = query.memberId;
  if (query?.role) where.role = query.role;
  if (query?.status) where.status = query.status;

  return await prisma.committeeRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getCommitteeRoleById = async (id: string) => {
  const cr = await prisma.committeeRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CommitteeRole assignment not found.");
  }
  return cr;
};

export const updateCommitteeRole = async (id: string, payload: any) => {
  const cr = await prisma.committeeRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CommitteeRole assignment not found.");
  }

  return await prisma.committeeRole.update({
    where: { id },
    data: {
      ...(payload.committeeId && { committeeId: payload.committeeId }),
      ...(payload.memberId && { memberId: payload.memberId }),
      ...(payload.role && { role: payload.role }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteCommitteeRole = async (id: string) => {
  const cr = await prisma.committeeRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CommitteeRole assignment not found.");
  }
  await prisma.committeeRole.delete({ where: { id } });
  return { message: "CommitteeRole assignment deleted successfully." };
};
