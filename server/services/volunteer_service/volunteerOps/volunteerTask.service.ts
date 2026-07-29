import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 8. VOLUNTEER TASK SERVICES ====================
export const createVolunteerTask = async (payload: any) => {
  if (!payload.assignmentId || !payload.title || !payload.dueDate) {
    throw new customError(status.BAD_REQUEST, "assignmentId, title, and dueDate are required.");
  }

  return await prisma.volunteerTask.create({
    data: {
      assignmentId: payload.assignmentId,
      title: payload.title,
      description: payload.description || null,
      priority: payload.priority || "MEDIUM",
      dueDate: new Date(payload.dueDate),
      completedAt: payload.completedAt ? new Date(payload.completedAt) : null,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllVolunteerTasks = async (query?: { assignmentId?: string; priority?: string; status?: string }) => {
  const where: any = {};
  if (query?.assignmentId) where.assignmentId = query.assignmentId;
  if (query?.priority) where.priority = query.priority;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerTask.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerTaskById = async (id: string) => {
  const item = await prisma.volunteerTask.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer task not found.");
  }
  return item;
};

export const updateVolunteerTask = async (id: string, payload: any) => {
  const item = await prisma.volunteerTask.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer task not found.");
  }

  return await prisma.volunteerTask.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.priority && { priority: payload.priority }),
      ...(payload.dueDate && { dueDate: new Date(payload.dueDate) }),
      ...(payload.completedAt !== undefined && { completedAt: payload.completedAt ? new Date(payload.completedAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteerTask = async (id: string) => {
  const item = await prisma.volunteerTask.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer task not found.");
  }
  await prisma.volunteerTask.delete({ where: { id } });
  return { message: "Volunteer task deleted successfully." };
};
