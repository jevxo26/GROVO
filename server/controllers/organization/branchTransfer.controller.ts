import status from "http-status";
import { branchTransferService } from "../../services/organization/branchTransfer.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchTransfer = catchAsync(async (req, res) => {
  const result = await branchTransferService.createBranchTransfer(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Transfer recorded successfully",
    data: result,
  });
});

const getAllBranchTransfers = catchAsync(async (req, res) => {
  const query = {
    fromBranchId: req.query.fromBranchId as string | undefined,
    toBranchId: req.query.toBranchId as string | undefined,
    status: req.query.status as string | undefined,
    resourceType: req.query.resourceType as string | undefined,
  };

  const result = await branchTransferService.getAllBranchTransfers(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Transfers fetched successfully",
    data: result,
  });
});

const getBranchTransferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTransferService.getBranchTransferById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Transfer fetched successfully",
    data: result,
  });
});

const updateBranchTransfer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTransferService.updateBranchTransfer(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Transfer updated successfully",
    data: result,
  });
});

const deleteBranchTransfer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTransferService.deleteBranchTransfer(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Transfer deleted successfully",
    data: result,
  });
});

export const branchTransferController = {
  createBranchTransfer,
  getAllBranchTransfers,
  getBranchTransferById,
  updateBranchTransfer,
  deleteBranchTransfer,
};
