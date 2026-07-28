import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 12. ALBUM SERVICES ====================
export const createAlbum = async (payload: any) => {
  if (!payload.title || !payload.branchId) {
    throw new customError(status.BAD_REQUEST, "title and branchId are required.");
  }

  return await prisma.album.create({
    data: {
      title: payload.title,
      description: payload.description || null,
      coverPhoto: payload.coverPhoto || null,
      branchId: payload.branchId,
      status: payload.status || "PUBLISHED",
    },
  });
};

export const getAllAlbums = async (query?: { branchId?: string; status?: string }) => {
  const where: any = {};
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.status) where.status = query.status;

  return await prisma.album.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getAlbumById = async (id: string) => {
  const item = await prisma.album.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album not found.");
  }
  return item;
};

export const updateAlbum = async (id: string, payload: any) => {
  const item = await prisma.album.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album not found.");
  }

  return await prisma.album.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.coverPhoto !== undefined && { coverPhoto: payload.coverPhoto }),
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteAlbum = async (id: string) => {
  const item = await prisma.album.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album not found.");
  }
  await prisma.album.delete({ where: { id } });
  return { message: "Album deleted successfully." };
};
