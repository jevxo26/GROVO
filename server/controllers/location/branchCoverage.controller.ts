import status from "http-status";
import { branchCoverageService } from "../../services/location/branchCoverage.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchCoverage = catchAsync(async (req, res) => {
  const result = await branchCoverageService.createBranchCoverage(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Coverage created successfully",
    data: result,
  });
});

const getAllBranchCoverages = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
  };

  const result = await branchCoverageService.getAllBranchCoverages(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Coverages fetched successfully",
    data: result,
  });
});

const getBranchCoverageById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchCoverageService.getBranchCoverageById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Coverage fetched successfully",
    data: result,
  });
});

const updateBranchCoverage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchCoverageService.updateBranchCoverage(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Coverage updated successfully",
    data: result,
  });
});

const deleteBranchCoverage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchCoverageService.deleteBranchCoverage(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Coverage deleted successfully",
    data: result,
  });
});

export const branchCoverageController = {
  createBranchCoverage,
  getAllBranchCoverages,
  getBranchCoverageById,
  updateBranchCoverage,
  deleteBranchCoverage,
};
