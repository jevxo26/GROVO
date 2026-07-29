import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 13. ALBUM MEDIA SERVICES ====================
export const createAlbumMedia = async (payload: any) => {
  if (!payload.albumId || !payload.mediaId) {
    throw new customError(status.BAD_REQUEST, "albumId and mediaId are required.");
  }

  return await prisma.albumMedia.create({
    data: {
      albumId: payload.albumId,
      mediaId: payload.mediaId,
      sortOrder: payload.sortOrder ? Number(payload.sortOrder) : 0,
    },
  });
};

export const getAllAlbumMedia = async (query?: { albumId?: string; mediaId?: string }) => {
  const where: any = {};
  if (query?.albumId) where.albumId = query.albumId;
  if (query?.mediaId) where.mediaId = query.mediaId;

  return await prisma.albumMedia.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });
};

export const getAlbumMediaById = async (id: string) => {
  const item = await prisma.albumMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album media link not found.");
  }
  return item;
};

export const updateAlbumMedia = async (id: string, payload: any) => {
  const item = await prisma.albumMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album media link not found.");
  }

  return await prisma.albumMedia.update({
    where: { id },
    data: {
      ...(payload.sortOrder !== undefined && { sortOrder: Number(payload.sortOrder) }),
    },
  });
};

export const deleteAlbumMedia = async (id: string) => {
  const item = await prisma.albumMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album media link not found.");
  }
  await prisma.albumMedia.delete({ where: { id } });
  return { message: "Album media link deleted successfully." };
};
