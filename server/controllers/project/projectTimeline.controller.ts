import status from "http-status";
import { projectTimelineService } from "../../services/project/projectTimeline.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const addProjectTimelineEvent = catchAsync(async (req, res) => {
  const createdByUserId = req.user?.userId;
  const result = await projectTimelineService.addProjectTimelineEvent(createdByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project timeline event added successfully",
    data: result,
  });
});

const getProjectTimelineByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await projectTimelineService.getProjectTimelineByProjectId(projectId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project timeline events fetched successfully",
    data: result,
  });
});

const getProjectTimelineById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectTimelineService.getProjectTimelineById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project timeline event fetched successfully",
    data: result,
  });
});

const updateProjectTimelineEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectTimelineService.updateProjectTimelineEvent(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project timeline event updated successfully",
    data: result,
  });
});

const deleteProjectTimelineEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectTimelineService.deleteProjectTimelineEvent(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project timeline event deleted successfully",
    data: result,
  });
});

export const projectTimelineController = {
  addProjectTimelineEvent,
  getProjectTimelineByProjectId,
  getProjectTimelineById,
  updateProjectTimelineEvent,
  deleteProjectTimelineEvent,
};
