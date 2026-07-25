import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectTimelinePayload {
  projectId: string;
  event: string;
  description?: string;
  eventDate: string | Date;
}

export interface UpdateProjectTimelinePayload {
  event?: string;
  description?: string;
  eventDate?: string | Date;
}

const addProjectTimelineEvent = async (createdByUserId: string | undefined, payload: CreateProjectTimelinePayload) => {
  if (!payload.projectId || !payload.event || !payload.eventDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId, event, eventDate.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  const timelineEvent = await prisma.projectTimeline.create({
    data: {
      projectId: payload.projectId,
      event: payload.event,
      description: payload.description || null,
      eventDate: new Date(payload.eventDate),
      createdBy: createdByUserId || null,
    },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
    },
  });

  return timelineEvent;
};

const getProjectTimelineByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const timeline = await prisma.projectTimeline.findMany({
    where: { projectId },
    orderBy: { eventDate: "asc" },
  });

  return timeline;
};

const getProjectTimelineById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Timeline event ID is required.");
  }

  const timelineEvent = await prisma.projectTimeline.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
    },
  });

  if (!timelineEvent) {
    throw new customError(status.NOT_FOUND, "Project timeline event not found.");
  }

  return timelineEvent;
};

const updateProjectTimelineEvent = async (id: string, payload: UpdateProjectTimelinePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Timeline event ID is required.");
  }

  const timelineEvent = await prisma.projectTimeline.findUnique({
    where: { id },
  });

  if (!timelineEvent) {
    throw new customError(status.NOT_FOUND, "Project timeline event not found.");
  }

  const updatedEvent = await prisma.projectTimeline.update({
    where: { id },
    data: {
      ...(payload.event && { event: payload.event }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.eventDate && { eventDate: new Date(payload.eventDate) }),
    },
  });

  return updatedEvent;
};

const deleteProjectTimelineEvent = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Timeline event ID is required.");
  }

  const timelineEvent = await prisma.projectTimeline.findUnique({
    where: { id },
  });

  if (!timelineEvent) {
    throw new customError(status.NOT_FOUND, "Project timeline event not found.");
  }

  await prisma.projectTimeline.delete({
    where: { id },
  });

  return { message: "Project timeline event deleted successfully." };
};

export const projectTimelineService = {
  addProjectTimelineEvent,
  getProjectTimelineByProjectId,
  getProjectTimelineById,
  updateProjectTimelineEvent,
  deleteProjectTimelineEvent,
};
