import status from "http-status";
import { MediaTypes } from "../../../generated/prisma/enums";
import { campaignMediaService } from "../../services/campaign/campaignMedia.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCampaignMedia = catchAsync(async (req, res) => {
  const uploadedBy = req.user?.userId;
  const result = await campaignMediaService.createCampaignMedia(uploadedBy, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign media uploaded successfully",
    data: result,
  });
});

const getCampaignMediaByCampaignId = catchAsync(async (req, res) => {
  const { campaignId } = req.params;
  const mediaType = req.query.mediaType as MediaTypes | undefined;
  const result = await campaignMediaService.getCampaignMediaByCampaignId(campaignId as string, mediaType);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign media fetched successfully",
    data: result,
  });
});

const getCampaignMediaById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignMediaService.getCampaignMediaById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign media fetched successfully",
    data: result,
  });
});

const updateCampaignMedia = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignMediaService.updateCampaignMedia(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign media updated successfully",
    data: result,
  });
});

const deleteCampaignMedia = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignMediaService.deleteCampaignMedia(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign media deleted successfully",
    data: result,
  });
});

export const campaignMediaController = {
  createCampaignMedia,
  getCampaignMediaByCampaignId,
  getCampaignMediaById,
  updateCampaignMedia,
  deleteCampaignMedia,
};
