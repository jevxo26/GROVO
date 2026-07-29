import status from "http-status";
import { branchExpenseService } from "../../services/organization/branchExpense.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchExpense = catchAsync(async (req, res) => {
  const result = await branchExpenseService.createBranchExpense(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Expense created successfully",
    data: result,
  });
});

const getAllBranchExpenses = catchAsync(async (req, res) => {
  const query = {
    branchBudgetId: req.query.branchBudgetId as string | undefined,
    approvedBy: req.query.approvedBy as string | undefined,
    expenseCategory: req.query.expenseCategory as string | undefined,
  };

  const result = await branchExpenseService.getAllBranchExpenses(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Expenses fetched successfully",
    data: result,
  });
});

const getBranchExpenseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchExpenseService.getBranchExpenseById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Expense fetched successfully",
    data: result,
  });
});

const updateBranchExpense = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchExpenseService.updateBranchExpense(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Expense updated successfully",
    data: result,
  });
});

const deleteBranchExpense = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchExpenseService.deleteBranchExpense(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Expense deleted successfully",
    data: result,
  });
});

export const branchExpenseController = {
  createBranchExpense,
  getAllBranchExpenses,
  getBranchExpenseById,
  updateBranchExpense,
  deleteBranchExpense,
};
