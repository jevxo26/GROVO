import { prisma } from "../../lib/prisma";

const createMediaCategory = async (payload: any) => {
  return await prisma.mediaCategory.create({ data: payload });
};
const uploadMedia = async (payload: any) => {
  const media = await prisma.media.create({ data: payload });

  await prisma.mediaActivityLog.create({
    data: {
      mediaId: media.id,
      activity: "UPLOADED",
      description: `Media '${media.title}' was uploaded successfully.`,
      performedBy: payload.uploadedBy,
    },
  });

  return media;
};

const getAllMedia = async (query: any) => {
  const { searchTerm, mediaType, status } = query;
  const where: any = {};

  if (searchTerm) {
    where.title = { contains: searchTerm, mode: "insensitive" };
  }
  if (mediaType) where.mediaType = mediaType;
  if (status) where.status = status;

  return await prisma.media.findMany({ where });
};

const createAlbum = async (payload: any) => {
  return await prisma.album.create({ data: payload });
};

const attachMediaToAlbum = async (payload: any) => {
  return await prisma.albumMedia.create({ data: payload });
};

const linkAlbumToEvent = async (payload: any) => {
  return await prisma.eventGallery.create({ data: payload });
};

export const MediaGalleryService = {
  createMediaCategory,
  uploadMedia,
  getAllMedia,
  createAlbum,
  attachMediaToAlbum,
  linkAlbumToEvent,
};
