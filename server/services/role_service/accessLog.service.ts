import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export const createAccessLog = async (payload: any) => {
  if (!payload.userId || !payload.module || !payload.action) {
    throw new customError(status.BAD_REQUEST, "userId, module, and action are required.");
  }

  return await prisma.accessLog.create({
    data: {
      userId: payload.userId,
      roleId: payload.roleId || null,
      module: payload.module,
      action: payload.action,
      ipAddress: payload.ipAddress || null,
      device: payload.device || null,
      browser: payload.browser || null,
    },
  });
};

export const getAllAccessLogs = async (query?: { userId?: string; roleId?: string; module?: string; action?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.module) where.module = query.module;
  if (query?.action) where.action = query.action;

  return await prisma.accessLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getAccessLogById = async (id: string) => {
  const log = await prisma.accessLog.findUnique({ where: { id } });
  if (!log) {
    throw new customError(status.NOT_FOUND, "Access log entry not found.");
  }
  return log;
};

export const deleteAccessLog = async (id: string) => {
  const log = await prisma.accessLog.findUnique({ where: { id } });
  if (!log) {
    throw new customError(status.NOT_FOUND, "Access log entry not found.");
  }
  await prisma.accessLog.delete({ where: { id } });
  return { message: "Access log entry deleted successfully." };
};
