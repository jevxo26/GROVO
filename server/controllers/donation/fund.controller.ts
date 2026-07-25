import status from "http-status";
import { fundService } from "../../services/donation/fund.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createFund = catchAsync(async (req, res) => {
  const result = await fundService.createFund(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Fund created successfully",
    data: result,
  });
});

const getAllFunds = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await fundService.getAllFunds(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Funds fetched successfully",
    data: result,
  });
});

const getFundById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundService.getFundById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund fetched successfully",
    data: result,
  });
});

const updateFund = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundService.updateFund(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund updated successfully",
    data: result,
  });
});

const deleteFund = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundService.deleteFund(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund deleted successfully",
    data: result,
  });
});

export const fundController = {
  createFund,
  getAllFunds,
  getFundById,
  updateFund,
  deleteFund,
};
