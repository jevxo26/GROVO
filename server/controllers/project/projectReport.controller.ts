import status from "http-status";
import { projectReportService } from "../../services/project/projectReport.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProjectReport = catchAsync(async (req, res) => {
  const publishedByUserId = req.user?.userId;
  const result = await projectReportService.createProjectReport(publishedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project report created successfully",
    data: result,
  });
});

const getProjectReportsByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const query = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await projectReportService.getProjectReportsByProjectId(projectId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project reports fetched successfully",
    data: result,
  });
});

const getProjectReportById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectReportService.getProjectReportById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project report fetched successfully",
    data: result,
  });
});

const updateProjectReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectReportService.updateProjectReport(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project report updated successfully",
    data: result,
  });
});

const deleteProjectReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectReportService.deleteProjectReport(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project report deleted successfully",
    data: result,
  });
});

export const projectReportController = {
  createProjectReport,
  getProjectReportsByProjectId,
  getProjectReportById,
  updateProjectReport,
  deleteProjectReport,
};
