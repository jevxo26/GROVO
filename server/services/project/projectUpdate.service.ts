import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectUpdatePayload {
  projectId: string;
  title: string;
  description: string;
  progressPercentage: number;
}

export interface UpdateProjectUpdatePayload {
  title?: string;
  description?: string;
  progressPercentage?: number;
}

const createProjectUpdate = async (publishedByUserId: string | undefined, payload: CreateProjectUpdatePayload) => {
  if (!payload.projectId || !payload.title || !payload.description || payload.progressPercentage === undefined) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId, title, description, progressPercentage.");
  }

  if (payload.progressPercentage < 0 || payload.progressPercentage > 100) {
    throw new customError(status.BAD_REQUEST, "progressPercentage must be between 0 and 100.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  const projectUpdate = await prisma.projectUpdate.create({
    data: {
      projectId: payload.projectId,
      title: payload.title,
      description: payload.description,
      progressPercentage: payload.progressPercentage,
      publishedBy: publishedByUserId || null,
    },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
    },
  });

  return projectUpdate;
};

const getProjectUpdatesByProjectId = async (
  projectId: string,
  query?: { page?: number; limit?: number }
) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const [updates, total] = await Promise.all([
    prisma.projectUpdate.findMany({
      where: { projectId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.projectUpdate.count({ where: { projectId } }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: updates,
  };
};

const getProjectUpdateById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Update ID is required.");
  }

  const projectUpdate = await prisma.projectUpdate.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true, status: true } },
    },
  });

  if (!projectUpdate) {
    throw new customError(status.NOT_FOUND, "Project update record not found.");
  }

  return projectUpdate;
};

const updateProjectUpdate = async (id: string, payload: UpdateProjectUpdatePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Update ID is required.");
  }

  const projectUpdate = await prisma.projectUpdate.findUnique({
    where: { id },
  });

  if (!projectUpdate) {
    throw new customError(status.NOT_FOUND, "Project update record not found.");
  }

  if (payload.progressPercentage !== undefined && (payload.progressPercentage < 0 || payload.progressPercentage > 100)) {
    throw new customError(status.BAD_REQUEST, "progressPercentage must be between 0 and 100.");
  }

  const updatedUpdate = await prisma.projectUpdate.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description && { description: payload.description }),
      ...(payload.progressPercentage !== undefined && { progressPercentage: payload.progressPercentage }),
    },
  });

  return updatedUpdate;
};

const deleteProjectUpdate = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Update ID is required.");
  }

  const projectUpdate = await prisma.projectUpdate.findUnique({
    where: { id },
  });

  if (!projectUpdate) {
    throw new customError(status.NOT_FOUND, "Project update record not found.");
  }

  await prisma.projectUpdate.delete({
    where: { id },
  });

  return { message: "Project update record deleted successfully." };
};

export const projectUpdateService = {
  createProjectUpdate,
  getProjectUpdatesByProjectId,
  getProjectUpdateById,
  updateProjectUpdate,
  deleteProjectUpdate,
};
