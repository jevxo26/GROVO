import status from "http-status";
import { campaignGoalService } from "../../services/campaign/campaignGoal.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCampaignGoal = catchAsync(async (req, res) => {
  const result = await campaignGoalService.createCampaignGoal(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign goal created successfully",
    data: result,
  });
});

const getCampaignGoalsByCampaignId = catchAsync(async (req, res) => {
  const { campaignId } = req.params;
  const result = await campaignGoalService.getCampaignGoalsByCampaignId(campaignId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign goals fetched successfully",
    data: result,
  });
});

const getCampaignGoalById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignGoalService.getCampaignGoalById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign goal fetched successfully",
    data: result,
  });
});

const updateCampaignGoal = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignGoalService.updateCampaignGoal(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign goal updated successfully",
    data: result,
  });
});

const deleteCampaignGoal = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignGoalService.deleteCampaignGoal(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign goal deleted successfully",
    data: result,
  });
});

export const campaignGoalController = {
  createCampaignGoal,
  getCampaignGoalsByCampaignId,
  getCampaignGoalById,
  updateCampaignGoal,
  deleteCampaignGoal,
};
