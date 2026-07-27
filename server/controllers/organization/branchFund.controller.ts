import status from "http-status";
import { branchFundService } from "../../services/organization/branchFund.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchFund = catchAsync(async (req, res) => {
  const result = await branchFundService.createBranchFund(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Fund created successfully",
    data: result,
  });
});

const getAllBranchFunds = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchFundService.getAllBranchFunds(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Funds fetched successfully",
    data: result,
  });
});

const getBranchFundById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchFundService.getBranchFundById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Fund fetched successfully",
    data: result,
  });
});

const updateBranchFund = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchFundService.updateBranchFund(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Fund updated successfully",
    data: result,
  });
});

const deleteBranchFund = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchFundService.deleteBranchFund(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Fund deleted successfully",
    data: result,
  });
});

export const branchFundController = {
  createBranchFund,
  getAllBranchFunds,
  getBranchFundById,
  updateBranchFund,
  deleteBranchFund,
};
