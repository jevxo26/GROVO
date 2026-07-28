import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 21. ERROR LOG SERVICES ====================
export const createErrorLog = async (payload: any) => {
  if (!payload.errorCode || !payload.message || !payload.module) {
    throw new customError(status.BAD_REQUEST, "errorCode, message, and module are required.");
  }

  return await prisma.errorLog.create({
    data: {
      errorCode: payload.errorCode,
      message: payload.message,
      module: payload.module,
      userId: payload.userId || null,
      stackTrace: payload.stackTrace || null,
      resolved: payload.resolved !== undefined ? Boolean(payload.resolved) : false,
    },
  });
};

export const getAllErrorLogs = async (query?: { errorCode?: string; module?: string; resolved?: boolean }) => {
  const where: any = {};
  if (query?.errorCode) where.errorCode = query.errorCode;
  if (query?.module) where.module = query.module;
  if (query?.resolved !== undefined) where.resolved = Boolean(query.resolved);

  return await prisma.errorLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getErrorLogById = async (id: string) => {
  const item = await prisma.errorLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Error log record not found.");
  }
  return item;
};

export const updateErrorLog = async (id: string, payload: any) => {
  const item = await prisma.errorLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Error log record not found.");
  }

  return await prisma.errorLog.update({
    where: { id },
    data: {
      ...(payload.resolved !== undefined && { resolved: Boolean(payload.resolved) }),
    },
  });
};

export const deleteErrorLog = async (id: string) => {
  const item = await prisma.errorLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Error log record not found.");
  }
  await prisma.errorLog.delete({ where: { id } });
  return { message: "Error log record deleted successfully." };
};
