import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 19. AUDIT LOG SERVICES ====================
export const createAuditLog = async (payload: any) => {
  if (!payload.userId || !payload.module || !payload.action) {
    throw new customError(status.BAD_REQUEST, "userId, module, and action are required.");
  }

  return await prisma.auditLog.create({
    data: {
      userId: payload.userId,
      module: payload.module,
      action: payload.action,
      oldValue: payload.oldValue || null,
      newValue: payload.newValue || null,
      ipAddress: payload.ipAddress || null,
    },
  });
};

export const getAllAuditLogs = async (query?: { userId?: string; module?: string; action?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.module) where.module = query.module;
  if (query?.action) where.action = query.action;

  return await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getAuditLogById = async (id: string) => {
  const item = await prisma.auditLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Audit log record not found.");
  }
  return item;
};

export const deleteAuditLog = async (id: string) => {
  const item = await prisma.auditLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Audit log record not found.");
  }
  await prisma.auditLog.delete({ where: { id } });
  return { message: "Audit log record deleted successfully." };
};
