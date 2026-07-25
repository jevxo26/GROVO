import status from "http-status";
import { projectCategoryService } from "../../services/project/projectCategory.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProjectCategory = catchAsync(async (req, res) => {
  const result = await projectCategoryService.createProjectCategory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project category created successfully",
    data: result,
  });
});

const getAllProjectCategories = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await projectCategoryService.getAllProjectCategories(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project categories fetched successfully",
    data: result,
  });
});

const getProjectCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectCategoryService.getProjectCategoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project category fetched successfully",
    data: result,
  });
});

const updateProjectCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectCategoryService.updateProjectCategory(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project category updated successfully",
    data: result,
  });
});

const deleteProjectCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectCategoryService.deleteProjectCategory(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project category deleted successfully",
    data: result,
  });
});

export const projectCategoryController = {
  createProjectCategory,
  getAllProjectCategories,
  getProjectCategoryById,
  updateProjectCategory,
  deleteProjectCategory,
};
