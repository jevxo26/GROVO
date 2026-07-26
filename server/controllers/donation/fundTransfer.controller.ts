import status from "http-status";
import { fundTransferService } from "../../services/donation/fundTransfer.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createFundTransfer = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await fundTransferService.createFundTransfer(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Fund transfer completed successfully",
    data: result,
  });
});

const getFundTransfersByFundId = catchAsync(async (req, res) => {
  const { fundId } = req.params;
  const result = await fundTransferService.getFundTransfersByFundId(fundId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund transfers fetched successfully",
    data: result,
  });
});

const getAllFundTransfers = catchAsync(async (req, res) => {
  const query = {
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await fundTransferService.getAllFundTransfers(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund transfers fetched successfully",
    data: result,
  });
});

const getFundTransferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundTransferService.getFundTransferById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund transfer fetched successfully",
    data: result,
  });
});

const deleteFundTransfer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await fundTransferService.deleteFundTransfer(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund transfer deleted and balances reverted successfully",
    data: result,
  });
});

export const fundTransferController = {
  createFundTransfer,
  getFundTransfersByFundId,
  getAllFundTransfers,
  getFundTransferById,
  deleteFundTransfer,
};
