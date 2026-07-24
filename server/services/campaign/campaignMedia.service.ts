import status from "http-status";
import { MediaTypes } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateCampaignMediaPayload {
  campaignId: string;
  mediaType: MediaTypes;
  title: string;
  fileUrl: string;
  thumbnail?: string;
}

export interface UpdateCampaignMediaPayload {
  mediaType?: MediaTypes;
  title?: string;
  fileUrl?: string;
  thumbnail?: string;
}

const createCampaignMedia = async (uploadedBy: string | undefined, payload: CreateCampaignMediaPayload) => {
  if (!payload.campaignId || !payload.mediaType || !payload.title || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "Required fields: campaignId, mediaType, title, fileUrl.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: payload.campaignId },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  const media = await prisma.campaignMedia.create({
    data: {
      campaignId: payload.campaignId,
      mediaType: payload.mediaType,
      title: payload.title,
      fileUrl: payload.fileUrl,
      thumbnail: payload.thumbnail || null,
      uploadedBy: uploadedBy || null,
    },
  });

  return media;
};

const getCampaignMediaByCampaignId = async (campaignId: string, mediaType?: MediaTypes) => {
  if (!campaignId) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const where: any = { campaignId };
  if (mediaType) {
    where.mediaType = mediaType;
  }

  const media = await prisma.campaignMedia.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return media;
};

const getCampaignMediaById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Media ID is required.");
  }

  const media = await prisma.campaignMedia.findUnique({
    where: { id },
    include: {
      campaign: {
        select: { id: true, title: true, campaignCode: true },
      },
    },
  });

  if (!media) {
    throw new customError(status.NOT_FOUND, "Campaign media not found.");
  }

  return media;
};

const updateCampaignMedia = async (id: string, payload: UpdateCampaignMediaPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Media ID is required.");
  }

  const media = await prisma.campaignMedia.findUnique({
    where: { id },
  });

  if (!media) {
    throw new customError(status.NOT_FOUND, "Campaign media not found.");
  }

  const updatedMedia = await prisma.campaignMedia.update({
    where: { id },
    data: {
      ...(payload.mediaType && { mediaType: payload.mediaType }),
      ...(payload.title && { title: payload.title }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.thumbnail !== undefined && { thumbnail: payload.thumbnail }),
    },
  });

  return updatedMedia;
};

const deleteCampaignMedia = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Media ID is required.");
  }

  const media = await prisma.campaignMedia.findUnique({
    where: { id },
  });

  if (!media) {
    throw new customError(status.NOT_FOUND, "Campaign media not found.");
  }

  await prisma.campaignMedia.delete({
    where: { id },
  });

  return { message: "Campaign media deleted successfully." };
};

export const campaignMediaService = {
  createCampaignMedia,
  getCampaignMediaByCampaignId,
  getCampaignMediaById,
  updateCampaignMedia,
  deleteCampaignMedia,
};
