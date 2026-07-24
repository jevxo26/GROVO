import status from "http-status";
import { projectUpdateService } from "../../services/project/projectUpdate.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProjectUpdate = catchAsync(async (req, res) => {
  const publishedByUserId = req.user?.userId;
  const result = await projectUpdateService.createProjectUpdate(publishedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project progress update published successfully",
    data: result,
  });
});

const getProjectUpdatesByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const query = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await projectUpdateService.getProjectUpdatesByProjectId(projectId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project progress updates fetched successfully",
    data: result,
  });
});

const getProjectUpdateById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectUpdateService.getProjectUpdateById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project update fetched successfully",
    data: result,
  });
});

const updateProjectUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectUpdateService.updateProjectUpdate(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project update updated successfully",
    data: result,
  });
});

const deleteProjectUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectUpdateService.deleteProjectUpdate(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project update deleted successfully",
    data: result,
  });
});

export const projectUpdateController = {
  createProjectUpdate,
  getProjectUpdatesByProjectId,
  getProjectUpdateById,
  updateProjectUpdate,
  deleteProjectUpdate,
};
