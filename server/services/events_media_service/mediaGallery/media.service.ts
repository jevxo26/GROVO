import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 10. MEDIA SERVICES ====================
export const createMedia = async (payload: any) => {
  if (!payload.title || !payload.mediaType || !payload.fileUrl || !payload.uploadedBy) {
    throw new customError(status.BAD_REQUEST, "title, mediaType, fileUrl, and uploadedBy are required.");
  }

  return await prisma.media.create({
    data: {
      title: payload.title,
      mediaType: payload.mediaType,
      fileUrl: payload.fileUrl,
      thumbnail: payload.thumbnail || null,
      uploadedBy: payload.uploadedBy,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllMedia = async (query?: { mediaType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.mediaType) where.mediaType = query.mediaType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.title = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.media.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getMediaById = async (id: string) => {
  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media asset not found.");
  }
  return item;
};

export const updateMedia = async (id: string, payload: any) => {
  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media asset not found.");
  }

  return await prisma.media.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.mediaType && { mediaType: payload.mediaType }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.thumbnail !== undefined && { thumbnail: payload.thumbnail }),
      ...(payload.uploadedBy && { uploadedBy: payload.uploadedBy }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteMedia = async (id: string) => {
  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media asset not found.");
  }
  await prisma.media.delete({ where: { id } });
  return { message: "Media asset deleted successfully." };
};
