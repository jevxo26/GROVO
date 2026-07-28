import status from "http-status";
import { beneficiaryReliefService } from "../../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 10. DISTRIBUTION CAMPAIGN CONTROLLERS ====================
export const createDistributionCampaign = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionCampaign(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution campaign created successfully",
    data: result,
  });
});

export const getAllDistributionCampaigns = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllDistributionCampaigns(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaigns retrieved successfully",
    data: result,
  });
});

export const getDistributionCampaignById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getDistributionCampaignById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaign retrieved successfully",
    data: result,
  });
});

export const updateDistributionCampaign = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateDistributionCampaign(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaign updated successfully",
    data: result,
  });
});

export const deleteDistributionCampaign = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteDistributionCampaign(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaign deleted successfully",
    data: result,
  });
});
