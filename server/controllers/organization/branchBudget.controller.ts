import status from "http-status";
import { branchBudgetService } from "../../services/organization/branchBudget.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchBudget = catchAsync(async (req, res) => {
  const result = await branchBudgetService.createBranchBudget(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Budget created successfully",
    data: result,
  });
});

const getAllBranchBudgets = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    fiscalYear: req.query.fiscalYear as string | undefined,
    status: req.query.status as string | undefined,
  };

  const result = await branchBudgetService.getAllBranchBudgets(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Budgets fetched successfully",
    data: result,
  });
});

const getBranchBudgetById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchBudgetService.getBranchBudgetById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Budget fetched successfully",
    data: result,
  });
});

const updateBranchBudget = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchBudgetService.updateBranchBudget(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Budget updated successfully",
    data: result,
  });
});

const deleteBranchBudget = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchBudgetService.deleteBranchBudget(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Budget deleted successfully",
    data: result,
  });
});

export const branchBudgetController = {
  createBranchBudget,
  getAllBranchBudgets,
  getBranchBudgetById,
  updateBranchBudget,
  deleteBranchBudget,
};
