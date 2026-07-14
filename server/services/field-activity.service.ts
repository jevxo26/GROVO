import { prisma } from "../lib/prisma";

const logActivity = async (payload: {
  projectId: string;
  activityTitle: string;
  activityType: string;
  location?: string;
  description?: string;
  performedBy: string;
  activityDate: string;
}) => {
  return await prisma.fieldActivity.create({
    data: {
      projectId: payload.projectId,
      activityTitle: payload.activityTitle,
      activityType: payload.activityType,
      location: payload.location,
      description: payload.description,
      performedBy: payload.performedBy,
      activityDate: new Date(payload.activityDate),
    },
  });
};

const logVisit = async (payload: {
  activityId: string;
  visitedBy: string;
  visitDate: string;
  remarks?: string;
}) => {
  return await prisma.fieldVisit.create({
    data: {
      activityId: payload.activityId,
      visitedBy: payload.visitedBy,
      visitDate: new Date(payload.visitDate),
      remarks: payload.remarks,
    },
  });
};

export const fieldActivityService = {
  logActivity,
  logVisit,
};
