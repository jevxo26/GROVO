import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 5. VOLUNTEER ASSIGNMENT SERVICES ====================
export const createVolunteerAssignment = async (payload: any) => {
  if (!payload.volunteerId || !payload.assignedBy || !payload.assignedRole) {
    throw new customError(status.BAD_REQUEST, "volunteerId, assignedBy, and assignedRole are required.");
  }

  return await prisma.volunteerAssignment.create({
    data: {
      volunteerId: payload.volunteerId,
      campaignId: payload.campaignId || null,
      projectId: payload.projectId || null,
      assignedBy: payload.assignedBy,
      assignedRole: payload.assignedRole,
      assignedDate: payload.assignedDate
        ? new Date(payload.assignedDate)
        : new Date(),
      status: payload.status || "PENDING",
    },
  });
};

export const getAllVolunteerAssignments = async (query?: { volunteerId?: string; campaignId?: string; projectId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.projectId) where.projectId = query.projectId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerAssignment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerAssignmentById = async (id: string) => {
  const item = await prisma.volunteerAssignment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer assignment not found.");
  }
  return item;
};

export const updateVolunteerAssignment = async (id: string, payload: any) => {
  const item = await prisma.volunteerAssignment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer assignment not found.");
  }

  return await prisma.volunteerAssignment.update({
    where: { id },
    data: {
      ...(payload.campaignId !== undefined && { campaignId: payload.campaignId }),
      ...(payload.projectId !== undefined && { projectId: payload.projectId }),
      ...(payload.assignedBy && { assignedBy: payload.assignedBy }),
      ...(payload.assignedRole && { assignedRole: payload.assignedRole }),
      ...(payload.assignedDate && { assignedDate: new Date(payload.assignedDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteerAssignment = async (id: string) => {
  const item = await prisma.volunteerAssignment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer assignment not found.");
  }
  await prisma.volunteerAssignment.delete({ where: { id } });
  return { message: "Volunteer assignment deleted successfully." };
};
