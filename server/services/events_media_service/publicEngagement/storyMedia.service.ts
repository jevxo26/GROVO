import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 16. STORY MEDIA SERVICES ====================
export const createStoryMedia = async (payload: any) => {
  if (!payload.storyId || !payload.mediaId) {
    throw new customError(status.BAD_REQUEST, "storyId and mediaId are required.");
  }

  return await prisma.storyMedia.create({
    data: {
      storyId: payload.storyId,
      mediaId: payload.mediaId,
    },
  });
};

export const getAllStoryMedia = async (query?: { storyId?: string; mediaId?: string }) => {
  const where: any = {};
  if (query?.storyId) where.storyId = query.storyId;
  if (query?.mediaId) where.mediaId = query.mediaId;

  return await prisma.storyMedia.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getStoryMediaById = async (id: string) => {
  const item = await prisma.storyMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Story media link not found.");
  }
  return item;
};

export const updateStoryMedia = async (id: string, payload: any) => {
  const item = await prisma.storyMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Story media link not found.");
  }

  return await prisma.storyMedia.update({
    where: { id },
    data: {
      ...(payload.storyId && { storyId: payload.storyId }),
      ...(payload.mediaId && { mediaId: payload.mediaId }),
    },
  });
};

export const deleteStoryMedia = async (id: string) => {
  const item = await prisma.storyMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Story media link not found.");
  }
  await prisma.storyMedia.delete({ where: { id } });
  return { message: "Story media link deleted successfully." };
};
