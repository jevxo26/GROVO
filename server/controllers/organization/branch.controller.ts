import status from "http-status";
import { branchService } from "../../services/organization/branch.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranch = catchAsync(async (req, res) => {
  const result = await branchService.createBranch(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch created successfully",
    data: result,
  });
});

const getBranchById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchService.getBranchById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch fetched successfully",
    data: result,
  });
});

const getBranchesByOrgId = catchAsync(async (req, res) => {
  const { organizationId } = req.params;
  const result = await branchService.getBranchesByOrgId(organizationId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branches fetched successfully",
    data: result,
  });
});

const getAllBranches = catchAsync(async (req, res) => {
  const query = {
    branchTypeId: req.query.branchTypeId as string | undefined,
    divisionId: req.query.divisionId as string | undefined,
    districtId: req.query.districtId as string | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await branchService.getAllBranches(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branches fetched successfully",
    data: result,
  });
});

const updateBranch = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchService.updateBranch(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch updated successfully",
    data: result,
  });
});

const deleteBranch = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchService.deleteBranch(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch deleted successfully",
    data: result,
  });
});

export const branchController = {
  createBranch,
  getBranchById,
  getBranchesByOrgId,
  getAllBranches,
  updateBranch,
  deleteBranch,
};
