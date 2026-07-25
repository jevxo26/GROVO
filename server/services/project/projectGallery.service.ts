import status from "http-status";
import { MediaTypes } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectGalleryPayload {
  projectId: string;
  title: string;
  mediaType: MediaTypes;
  fileUrl: string;
}

export interface UpdateProjectGalleryPayload {
  title?: string;
  mediaType?: MediaTypes;
  fileUrl?: string;
}

const addProjectGalleryMedia = async (uploadedByUserId: string | undefined, payload: CreateProjectGalleryPayload) => {
  if (!payload.projectId || !payload.title || !payload.mediaType || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId, title, mediaType, fileUrl.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  const galleryItem = await prisma.projectGallery.create({
    data: {
      projectId: payload.projectId,
      title: payload.title,
      mediaType: payload.mediaType,
      fileUrl: payload.fileUrl,
      uploadedBy: uploadedByUserId || null,
    },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
    },
  });

  return galleryItem;
};

const getProjectGalleryByProjectId = async (projectId: string, mediaType?: MediaTypes) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const where: any = { projectId };
  if (mediaType) {
    where.mediaType = mediaType;
  }

  const galleryItems = await prisma.projectGallery.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return galleryItems;
};

const getProjectGalleryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Gallery item ID is required.");
  }

  const galleryItem = await prisma.projectGallery.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
    },
  });

  if (!galleryItem) {
    throw new customError(status.NOT_FOUND, "Project gallery item not found.");
  }

  return galleryItem;
};

const updateProjectGallery = async (id: string, payload: UpdateProjectGalleryPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Gallery item ID is required.");
  }

  const galleryItem = await prisma.projectGallery.findUnique({
    where: { id },
  });

  if (!galleryItem) {
    throw new customError(status.NOT_FOUND, "Project gallery item not found.");
  }

  const updatedItem = await prisma.projectGallery.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.mediaType && { mediaType: payload.mediaType }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
    },
  });

  return updatedItem;
};

const deleteProjectGallery = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Gallery item ID is required.");
  }

  const galleryItem = await prisma.projectGallery.findUnique({
    where: { id },
  });

  if (!galleryItem) {
    throw new customError(status.NOT_FOUND, "Project gallery item not found.");
  }

  await prisma.projectGallery.delete({
    where: { id },
  });

  return { message: "Project gallery item deleted successfully." };
};

export const projectGalleryService = {
  addProjectGalleryMedia,
  getProjectGalleryByProjectId,
  getProjectGalleryById,
  updateProjectGallery,
  deleteProjectGallery,
};
