import status from "http-status";
import { MediaTypes } from "../../../generated/prisma/enums";
import { projectGalleryService } from "../../services/project/projectGallery.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const addProjectGalleryMedia = catchAsync(async (req, res) => {
  const uploadedByUserId = req.user?.userId;
  const result = await projectGalleryService.addProjectGalleryMedia(uploadedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project gallery media uploaded successfully",
    data: result,
  });
});

const getProjectGalleryByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const mediaType = req.query.mediaType as MediaTypes | undefined;
  const result = await projectGalleryService.getProjectGalleryByProjectId(projectId as string, mediaType);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project gallery media fetched successfully",
    data: result,
  });
});

const getProjectGalleryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectGalleryService.getProjectGalleryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project gallery item fetched successfully",
    data: result,
  });
});

const updateProjectGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectGalleryService.updateProjectGallery(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project gallery item updated successfully",
    data: result,
  });
});

const deleteProjectGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectGalleryService.deleteProjectGallery(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project gallery item deleted successfully",
    data: result,
  });
});

export const projectGalleryController = {
  addProjectGalleryMedia,
  getProjectGalleryByProjectId,
  getProjectGalleryById,
  updateProjectGallery,
  deleteProjectGallery,
};
