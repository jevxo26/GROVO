import status from "http-status";
import { branchPerformanceService } from "../../services/organization/branchPerformance.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchPerformance = catchAsync(async (req, res) => {
  const result = await branchPerformanceService.createBranchPerformance(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Performance metrics created successfully",
    data: result,
  });
});

const getAllBranchPerformances = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    year: req.query.year ? Number(req.query.year) : undefined,
  };

  const result = await branchPerformanceService.getAllBranchPerformances(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Performances fetched successfully",
    data: result,
  });
});

const getBranchPerformanceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchPerformanceService.getBranchPerformanceById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Performance fetched successfully",
    data: result,
  });
});

const updateBranchPerformance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchPerformanceService.updateBranchPerformance(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Performance updated successfully",
    data: result,
  });
});

const deleteBranchPerformance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchPerformanceService.deleteBranchPerformance(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Performance deleted successfully",
    data: result,
  });
});

export const branchPerformanceController = {
  createBranchPerformance,
  getAllBranchPerformances,
  getBranchPerformanceById,
  updateBranchPerformance,
  deleteBranchPerformance,
};
