import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 11. MEDIA CATEGORY SERVICES ====================
const createMediaCategory = async (payload: any) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "name is required.");
  }

  const existing = await prisma.mediaCategory.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Media category '${payload.name}' already exists`);
  }

  return await prisma.mediaCategory.create({
    data: {
      name: payload.name,
      description: payload.description || null,
    },
  });
};

const getAllMediaCategories = async () => {
  return await prisma.mediaCategory.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getMediaCategoryById = async (id: string) => {
  const item = await prisma.mediaCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media category not found.");
  }
  return item;
};

const updateMediaCategory = async (id: string, payload: any) => {
  const item = await prisma.mediaCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media category not found.");
  }

  if (payload.name && payload.name !== item.name) {
    const existing = await prisma.mediaCategory.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, `Media category '${payload.name}' already exists`);
    }
  }

  return await prisma.mediaCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

const deleteMediaCategory = async (id: string) => {
  const item = await prisma.mediaCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media category not found.");
  }
  await prisma.mediaCategory.delete({ where: { id } });
  return { message: "Media category deleted successfully." };
};


// ==================== 10. MEDIA SERVICES ====================
const createMedia = async (payload: any) => {
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

const getAllMedia = async (query?: { mediaType?: string; status?: string; search?: string }) => {
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

const getMediaById = async (id: string) => {
  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media asset not found.");
  }
  return item;
};

const updateMedia = async (id: string, payload: any) => {
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

const deleteMedia = async (id: string) => {
  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media asset not found.");
  }
  await prisma.media.delete({ where: { id } });
  return { message: "Media asset deleted successfully." };
};


// ==================== 12. ALBUM SERVICES ====================
const createAlbum = async (payload: any) => {
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

const getAllAlbums = async (query?: { branchId?: string; status?: string }) => {
  const where: any = {};
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.status) where.status = query.status;

  return await prisma.album.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getAlbumById = async (id: string) => {
  const item = await prisma.album.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album not found.");
  }
  return item;
};

const updateAlbum = async (id: string, payload: any) => {
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

const deleteAlbum = async (id: string) => {
  const item = await prisma.album.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album not found.");
  }
  await prisma.album.delete({ where: { id } });
  return { message: "Album deleted successfully." };
};


// ==================== 13. ALBUM MEDIA SERVICES ====================
const createAlbumMedia = async (payload: any) => {
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

const getAllAlbumMedia = async (query?: { albumId?: string; mediaId?: string }) => {
  const where: any = {};
  if (query?.albumId) where.albumId = query.albumId;
  if (query?.mediaId) where.mediaId = query.mediaId;

  return await prisma.albumMedia.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });
};

const getAlbumMediaById = async (id: string) => {
  const item = await prisma.albumMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album media link not found.");
  }
  return item;
};

const updateAlbumMedia = async (id: string, payload: any) => {
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

const deleteAlbumMedia = async (id: string) => {
  const item = await prisma.albumMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Album media link not found.");
  }
  await prisma.albumMedia.delete({ where: { id } });
  return { message: "Album media link deleted successfully." };
};


// ==================== 21. MEDIA ACTIVITY LOG SERVICES ====================
const createMediaActivityLog = async (payload: any) => {
  if (!payload.mediaId || !payload.activity || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "mediaId, activity, and performedBy are required.");
  }

  return await prisma.mediaActivityLog.create({
    data: {
      mediaId: payload.mediaId,
      activity: payload.activity,
      description: payload.description || null,
      performedBy: payload.performedBy,
    },
  });
};

const getAllMediaActivityLogs = async (query?: { mediaId?: string }) => {
  const where: any = {};
  if (query?.mediaId) where.mediaId = query.mediaId;

  return await prisma.mediaActivityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getMediaActivityLogById = async (id: string) => {
  const item = await prisma.mediaActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media activity log not found.");
  }
  return item;
};

const deleteMediaActivityLog = async (id: string) => {
  const item = await prisma.mediaActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Media activity log not found.");
  }
  await prisma.mediaActivityLog.delete({ where: { id } });
  return { message: "Media activity log deleted successfully." };
};


export const mediaGalleryService = {
  // MediaCategory
  createMediaCategory,
  getAllMediaCategories,
  getMediaCategoryById,
  updateMediaCategory,
  deleteMediaCategory,
  // Media
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  // Album
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  // AlbumMedia
  createAlbumMedia,
  getAllAlbumMedia,
  getAlbumMediaById,
  updateAlbumMedia,
  deleteAlbumMedia,
  // MediaActivityLog
  createMediaActivityLog,
  getAllMediaActivityLogs,
  getMediaActivityLogById,
  deleteMediaActivityLog,
};
