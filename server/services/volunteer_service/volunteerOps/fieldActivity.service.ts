import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 9. FIELD ACTIVITY SERVICES ====================
export const createFieldActivity = async (payload: any) => {
  if (!payload.projectId || !payload.activityTitle || !payload.activityType || !payload.location || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "projectId, activityTitle, activityType, location, and performedBy are required.");
  }

  return await prisma.fieldActivity.create({
    data: {
      projectId: payload.projectId,
      activityTitle: payload.activityTitle,
      activityType: payload.activityType,
      location: payload.location,
      description: payload.description || null,
      performedBy: payload.performedBy,
      activityDate: payload.activityDate
        ? new Date(payload.activityDate)
        : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllFieldActivities = async (query?: { projectId?: string; activityType?: string; status?: string }) => {
  const where: any = {};
  if (query?.projectId) where.projectId = query.projectId;
  if (query?.activityType) where.activityType = query.activityType;
  if (query?.status) where.status = query.status;

  return await prisma.fieldActivity.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getFieldActivityById = async (id: string) => {
  const item = await prisma.fieldActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field activity not found.");
  }
  return item;
};

export const updateFieldActivity = async (id: string, payload: any) => {
  const item = await prisma.fieldActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field activity not found.");
  }

  return await prisma.fieldActivity.update({
    where: { id },
    data: {
      ...(payload.activityTitle && { activityTitle: payload.activityTitle }),
      ...(payload.activityType && { activityType: payload.activityType }),
      ...(payload.location && { location: payload.location }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.performedBy && { performedBy: payload.performedBy }),
      ...(payload.activityDate && { activityDate: new Date(payload.activityDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteFieldActivity = async (id: string) => {
  const item = await prisma.fieldActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field activity not found.");
  }
  await prisma.fieldActivity.delete({ where: { id } });
  return { message: "Field activity deleted successfully." };
};
