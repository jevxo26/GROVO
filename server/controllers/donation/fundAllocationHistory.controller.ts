import status from "http-status";
import { fundAllocationHistoryService } from "../../services/donation/fundAllocationHistory.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const recordFundAllocationHistory = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await fundAllocationHistoryService.recordFundAllocationHistory(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Fund allocation recorded successfully",
    data: result,
  });
});

const getFundAllocationHistoryByFundId = catchAsync(async (req, res) => {
  const { fundId } = req.params;
  const result = await fundAllocationHistoryService.getFundAllocationHistoryByFundId(fundId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund allocation histories fetched successfully",
    data: result,
  });
});

const getAllFundAllocationHistories = catchAsync(async (req, res) => {
  const query = {
    projectId: req.query.projectId as string | undefined,
    campaignId: req.query.campaignId as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await fundAllocationHistoryService.getAllFundAllocationHistories(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund allocation histories fetched successfully",
    data: result,
  });
});

const getFundAllocationHistoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundAllocationHistoryService.getFundAllocationHistoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund allocation history fetched successfully",
    data: result,
  });
});

const deleteFundAllocationHistory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundAllocationHistoryService.deleteFundAllocationHistory(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund allocation history deleted and fund balance restored successfully",
    data: result,
  });
});

export const fundAllocationHistoryController = {
  recordFundAllocationHistory,
  getFundAllocationHistoryByFundId,
  getAllFundAllocationHistories,
  getFundAllocationHistoryById,
  deleteFundAllocationHistory,
};
