import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 21. MEDIA ACTIVITY LOG SERVICES ====================
export const createMediaActivityLog = async (payload: any) => {
  if (!payload.mediaId || !payload.activity || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "mediaId, activity, and performedBy are required.");
  }

  return await prisma.mediaActivityLog.create({
    data: {
      mediaId: payload.mediaId,
      activity: payload.activity,
      description: payload.description || null,
      performedBy: payload.performedBy,
    },
  });
};

export const getAllMediaActivityLogs = async (query?: { mediaId?: string }) => {
  const where: any = {};
  if (query?.mediaId) where.mediaId = query.mediaId;

  return await prisma.mediaActivityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getMediaActivityLogById = async (id: string) => {
  const item = await prisma.mediaActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media activity log not found.");
  }
  return item;
};

export const deleteMediaActivityLog = async (id: string) => {
  const item = await prisma.mediaActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media activity log not found.");
  }
  await prisma.mediaActivityLog.delete({ where: { id } });
  return { message: "Media activity log deleted successfully." };
};
