import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 20. SYSTEM LOG SERVICES ====================
export const createSystemLog = async (payload: any) => {
  if (!payload.logLevel || !payload.module || !payload.message) {
    throw new customError(status.BAD_REQUEST, "logLevel, module, and message are required.");
  }

  return await prisma.systemLog.create({
    data: {
      logLevel: payload.logLevel,
      module: payload.module,
      message: payload.message,
      stackTrace: payload.stackTrace || null,
    },
  });
};

export const getAllSystemLogs = async (query?: { logLevel?: string; module?: string }) => {
  const where: any = {};
  if (query?.logLevel) where.logLevel = query.logLevel;
  if (query?.module) where.module = query.module;

  return await prisma.systemLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getSystemLogById = async (id: string) => {
  const item = await prisma.systemLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "System log record not found.");
  }
  return item;
};

export const deleteSystemLog = async (id: string) => {
  const item = await prisma.systemLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "System log record not found.");
  }
  await prisma.systemLog.delete({ where: { id } });
  return { message: "System log record deleted successfully." };
};
