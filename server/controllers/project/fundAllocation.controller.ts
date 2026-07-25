import status from "http-status";
import { fundAllocationService } from "../../services/project/fundAllocation.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createFundAllocation = catchAsync(async (req, res) => {
  const approvedByUserId = req.user?.userId;
  const result = await fundAllocationService.createFundAllocation(approvedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Fund allocation recorded successfully",
    data: result,
  });
});

const getFundAllocationsByCampaignId = catchAsync(async (req, res) => {
  const { campaignId } = req.params;
  const result = await fundAllocationService.getFundAllocationsByCampaignId(campaignId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign fund allocations fetched successfully",
    data: result,
  });
});

const getFundAllocationsByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await fundAllocationService.getFundAllocationsByProjectId(projectId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project fund allocations fetched successfully",
    data: result,
  });
});

const getFundAllocationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundAllocationService.getFundAllocationById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund allocation fetched successfully",
    data: result,
  });
});

const deleteFundAllocation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundAllocationService.deleteFundAllocation(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund allocation deleted successfully",
    data: result,
  });
});

export const fundAllocationController = {
  createFundAllocation,
  getFundAllocationsByCampaignId,
  getFundAllocationsByProjectId,
  getFundAllocationById,
  deleteFundAllocation,
};
