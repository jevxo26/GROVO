import status from "http-status";
import { ProjectStatus } from "../../../generated/prisma/enums";
import { projectService } from "../../services/project/project.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProject = catchAsync(async (req, res) => {
  const result = await projectService.createProject(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const query = {
    campaignId: req.query.campaignId as string | undefined,
    categoryId: req.query.categoryId as string | undefined,
    projectManagerId: req.query.projectManagerId as string | undefined,
    status: req.query.status as ProjectStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await projectService.getAllProjects(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Projects fetched successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectService.getProjectById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project fetched successfully",
    data: result,
  });
});

const getProjectByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  const result = await projectService.getProjectByCode(code as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectService.updateProject(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectService.deleteProject(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project deleted successfully",
    data: result,
  });
});

const getProjectStats = catchAsync(async (req, res) => {
  const result = await projectService.getProjectStats();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project statistics fetched successfully",
    data: result,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByCode,
  updateProject,
  deleteProject,
  getProjectStats,
};
