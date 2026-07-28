import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 21. VOLUNTEER ACTIVITY LOG SERVICES ====================
export const createVolunteerActivityLog = async (payload: any) => {
  if (!payload.volunteerId || !payload.activity || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "volunteerId, activity, and performedBy are required.");
  }

  return await prisma.volunteerActivityLog.create({
    data: {
      volunteerId: payload.volunteerId,
      activity: payload.activity,
      description: payload.description || null,
      performedBy: payload.performedBy,
    },
  });
};

export const getAllVolunteerActivityLogs = async (query?: { volunteerId?: string; activity?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.activity) where.activity = query.activity;

  return await prisma.volunteerActivityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerActivityLogById = async (id: string) => {
  const item = await prisma.volunteerActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer activity log not found.");
  }
  return item;
};

export const deleteVolunteerActivityLog = async (id: string) => {
  const item = await prisma.volunteerActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer activity log not found.");
  }
  await prisma.volunteerActivityLog.delete({ where: { id } });
  return { message: "Volunteer activity log deleted successfully." };
};
