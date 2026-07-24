import status from "http-status";
import { projectBudgetService } from "../../services/project/projectBudget.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProjectBudget = catchAsync(async (req, res) => {
  const approvedByUserId = req.user?.userId;
  const result = await projectBudgetService.createProjectBudget(approvedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project budget created successfully",
    data: result,
  });
});

const getProjectBudgetByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await projectBudgetService.getProjectBudgetByProjectId(projectId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project budget fetched successfully",
    data: result,
  });
});

const getProjectBudgetById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectBudgetService.getProjectBudgetById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project budget fetched successfully",
    data: result,
  });
});

const updateProjectBudget = catchAsync(async (req, res) => {
  const { id } = req.params;
  const approvedByUserId = req.user?.userId;
  const result = await projectBudgetService.updateProjectBudget(id as string, approvedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project budget updated successfully",
    data: result,
  });
});

const deleteProjectBudget = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectBudgetService.deleteProjectBudget(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project budget deleted successfully",
    data: result,
  });
});

export const projectBudgetController = {
  createProjectBudget,
  getProjectBudgetByProjectId,
  getProjectBudgetById,
  updateProjectBudget,
  deleteProjectBudget,
};
