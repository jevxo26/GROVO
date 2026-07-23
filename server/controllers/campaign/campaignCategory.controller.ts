import status from "http-status";
import { campaignCategoryService } from "../../services/campaign/campaignCategory.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCampaignCategory = catchAsync(async (req, res) => {
  const result = await campaignCategoryService.createCampaignCategory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign category created successfully",
    data: result,
  });
});

const getAllCampaignCategories = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await campaignCategoryService.getAllCampaignCategories(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign categories fetched successfully",
    data: result,
  });
});

const getCampaignCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignCategoryService.getCampaignCategoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign category fetched successfully",
    data: result,
  });
});

const updateCampaignCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignCategoryService.updateCampaignCategory(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign category updated successfully",
    data: result,
  });
});

const deleteCampaignCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignCategoryService.deleteCampaignCategory(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign category deleted successfully",
    data: result,
  });
});

export const campaignCategoryController = {
  createCampaignCategory,
  getAllCampaignCategories,
  getCampaignCategoryById,
  updateCampaignCategory,
  deleteCampaignCategory,
};
