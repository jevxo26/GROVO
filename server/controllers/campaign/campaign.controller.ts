import status from "http-status";
import { CampaignStatus, CampaignType } from "../../../generated/prisma/enums";
import { campaignService } from "../../services/campaign/campaign.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCampaign = catchAsync(async (req, res) => {
  const createdBy = req.user?.userId;
  const result = await campaignService.createCampaign(createdBy, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign created successfully",
    data: result,
  });
});

const getAllCampaigns = catchAsync(async (req, res) => {
  const query = {
    categoryId: req.query.categoryId as string | undefined,
    campaignType: req.query.campaignType as CampaignType | undefined,
    status: req.query.status as CampaignStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await campaignService.getAllCampaigns(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaigns fetched successfully",
    data: result,
  });
});

const getCampaignById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignService.getCampaignById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign fetched successfully",
    data: result,
  });
});

const getCampaignBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await campaignService.getCampaignBySlug(slug as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign fetched successfully",
    data: result,
  });
});

const updateCampaign = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignService.updateCampaign(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign updated successfully",
    data: result,
  });
});

const deleteCampaign = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignService.deleteCampaign(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign deleted successfully",
    data: result,
  });
});

const getCampaignStats = catchAsync(async (req, res) => {
  const result = await campaignService.getCampaignStats();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign statistics fetched successfully",
    data: result,
  });
});

export const campaignController = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  getCampaignBySlug,
  updateCampaign,
  deleteCampaign,
  getCampaignStats,
};
