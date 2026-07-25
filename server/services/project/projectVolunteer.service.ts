import status from "http-status";
import { VolunteerCompletionStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface AssignProjectVolunteerPayload {
  projectId: string;
  volunteerId: string;
  assignedRole?: string;
  assignedDate?: string | Date;
  completionStatus?: VolunteerCompletionStatus;
}

export interface UpdateProjectVolunteerPayload {
  assignedRole?: string;
  completionStatus?: VolunteerCompletionStatus;
}

const assignProjectVolunteer = async (payload: AssignProjectVolunteerPayload) => {
  if (!payload.projectId || !payload.volunteerId) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId and volunteerId.");
  }

  const [project, volunteerUser] = await Promise.all([
    prisma.project.findUnique({ where: { id: payload.projectId } }),
    prisma.user.findUnique({ where: { id: payload.volunteerId } }),
  ]);

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  if (!volunteerUser) {
    throw new customError(status.NOT_FOUND, "Volunteer user not found.");
  }

  const existingAssignment = await prisma.projectVolunteer.findFirst({
    where: {
      projectId: payload.projectId,
      volunteerId: payload.volunteerId,
      completionStatus: { in: [VolunteerCompletionStatus.ASSIGNED, VolunteerCompletionStatus.IN_PROGRESS] },
    },
  });

  if (existingAssignment) {
    throw new customError(status.CONFLICT, "Volunteer is already assigned to this project.");
  }

  const assignment = await prisma.projectVolunteer.create({
    data: {
      projectId: payload.projectId,
      volunteerId: payload.volunteerId,
      assignedRole: payload.assignedRole || null,
      assignedDate: payload.assignedDate ? new Date(payload.assignedDate) : new Date(),
      completionStatus: payload.completionStatus || VolunteerCompletionStatus.ASSIGNED,
    },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
      volunteer: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  return assignment;
};

const getVolunteersByProjectId = async (
  projectId: string,
  query?: { completionStatus?: VolunteerCompletionStatus; page?: number; limit?: number }
) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = { projectId };
  if (query?.completionStatus) {
    where.completionStatus = query.completionStatus;
  }

  const [assignments, total] = await Promise.all([
    prisma.projectVolunteer.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        volunteer: { select: { id: true, fullName: true, email: true, phone: true, profilePhoto: true } },
      },
    }),
    prisma.projectVolunteer.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: assignments,
  };
};

const getProjectVolunteersByVolunteerId = async (volunteerId: string) => {
  if (!volunteerId) {
    throw new customError(status.BAD_REQUEST, "Volunteer User ID is required.");
  }

  const assignments = await prisma.projectVolunteer.findMany({
    where: { volunteerId },
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true, status: true, startDate: true, endDate: true } },
    },
  });

  return assignments;
};

const getProjectVolunteerById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Volunteer assignment ID is required.");
  }

  const assignment = await prisma.projectVolunteer.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true, status: true } },
      volunteer: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Volunteer project assignment not found.");
  }

  return assignment;
};

const updateProjectVolunteer = async (id: string, payload: UpdateProjectVolunteerPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Volunteer assignment ID is required.");
  }

  const assignment = await prisma.projectVolunteer.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Volunteer project assignment not found.");
  }

  const updatedAssignment = await prisma.projectVolunteer.update({
    where: { id },
    data: {
      ...(payload.assignedRole !== undefined && { assignedRole: payload.assignedRole }),
      ...(payload.completionStatus && { completionStatus: payload.completionStatus }),
    },
    include: {
      volunteer: { select: { id: true, fullName: true, email: true } },
    },
  });

  return updatedAssignment;
};

const removeProjectVolunteer = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Volunteer assignment ID is required.");
  }

  const assignment = await prisma.projectVolunteer.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Volunteer project assignment not found.");
  }

  await prisma.projectVolunteer.delete({
    where: { id },
  });

  return { message: "Volunteer project assignment removed successfully." };
};

export const projectVolunteerService = {
  assignProjectVolunteer,
  getVolunteersByProjectId,
  getProjectVolunteersByVolunteerId,
  getProjectVolunteerById,
  updateProjectVolunteer,
  removeProjectVolunteer,
};
