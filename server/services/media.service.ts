import { prisma } from "../lib/prisma";

const registerUpload = async (payload: {
  title: string;
  description?: string;
  mediaType: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
}) => {
  return await prisma.media.create({
    data: {
      title: payload.title,
      description: payload.description,
      mediaType: payload.mediaType,
      fileUrl: payload.fileUrl,
      fileSize: parseInt(payload.fileSize.toString(), 10),
      uploadedBy: payload.uploadedBy,
      status: "ACTIVE",
    },
  });
};

const getUserAssets = async (userId: string) => {
  return await prisma.media.findMany({
    where: { uploadedBy: userId, status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });
};

export const mediaService = {
  registerUpload,
  getUserAssets,
};
