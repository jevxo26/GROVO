import httpStatus from "http-status";
import customError from "../error/customError";
import { mediaService } from "../services/media.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerUpload = catchAsync(async (req, res) => {
  const { title, description, mediaType, fileUrl, fileSize, uploadedBy } = req.body;

  if (!title || !fileUrl || !uploadedBy) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core asset records.",
    );
  }

  const result = await mediaService.registerUpload({
    title,
    description,
    mediaType,
    fileUrl,
    fileSize,
    uploadedBy,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Media upload registered successfully",
    data: result,
  });
});

const getUserAssets = catchAsync(async (req, res) => {
  const rawUser = req.params.userId;
  const targetUserId = Array.isArray(rawUser) ? rawUser[0] : rawUser;

  if (!targetUserId || typeof targetUserId !== "string") {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Invalid user parameter format.",
    );
  }

  const result = await mediaService.getUserAssets(targetUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User media assets retrieved successfully",
    data: result,
  });
});

export const mediaController = {
  registerUpload,
  getUserAssets,
};
