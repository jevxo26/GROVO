import status from "http-status";
import { campaignMilestoneService } from "../../services/campaign/campaignMilestone.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCampaignMilestone = catchAsync(async (req, res) => {
  const result = await campaignMilestoneService.createCampaignMilestone(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign milestone created successfully",
    data: result,
  });
});

const getCampaignMilestonesByCampaignId = catchAsync(async (req, res) => {
  const { campaignId } = req.params;
  const result = await campaignMilestoneService.getCampaignMilestonesByCampaignId(campaignId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign milestones fetched successfully",
    data: result,
  });
});

const getCampaignMilestoneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignMilestoneService.getCampaignMilestoneById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign milestone fetched successfully",
    data: result,
  });
});

const updateCampaignMilestone = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignMilestoneService.updateCampaignMilestone(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign milestone updated successfully",
    data: result,
  });
});

const deleteCampaignMilestone = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignMilestoneService.deleteCampaignMilestone(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign milestone deleted successfully",
    data: result,
  });
});

export const campaignMilestoneController = {
  createCampaignMilestone,
  getCampaignMilestonesByCampaignId,
  getCampaignMilestoneById,
  updateCampaignMilestone,
  deleteCampaignMilestone,
};
