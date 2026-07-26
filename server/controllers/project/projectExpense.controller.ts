import status from "http-status";
import { ExpenseStatus } from "../../../generated/prisma/enums";
import { projectExpenseService } from "../../services/project/projectExpense.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProjectExpense = catchAsync(async (req, res) => {
  const approvedByUserId = req.user?.userId;
  const result = await projectExpenseService.createProjectExpense(approvedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project expense recorded successfully",
    data: result,
  });
});

const getProjectExpensesByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const query = {
    status: req.query.status as ExpenseStatus | undefined,
    category: req.query.category as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await projectExpenseService.getProjectExpensesByProjectId(projectId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project expenses fetched successfully",
    data: result,
  });
});

const getProjectExpenseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectExpenseService.getProjectExpenseById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project expense fetched successfully",
    data: result,
  });
});

const updateProjectExpense = catchAsync(async (req, res) => {
  const { id } = req.params;
  const approvedByUserId = req.user?.userId;
  const result = await projectExpenseService.updateProjectExpense(id as string, approvedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project expense updated successfully",
    data: result,
  });
});

const deleteProjectExpense = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectExpenseService.deleteProjectExpense(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project expense deleted successfully",
    data: result,
  });
});

export const projectExpenseController = {
  createProjectExpense,
  getProjectExpensesByProjectId,
  getProjectExpenseById,
  updateProjectExpense,
  deleteProjectExpense,
};
