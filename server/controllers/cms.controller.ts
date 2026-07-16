import httpStatus from "http-status";
import customError from "../error/customError";
import { cmsService } from "../services/cms.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createPage = catchAsync(async (req, res) => {
  const { title, slug, content, metaTitle, metaDesc, template } = req.body;

  if (!title || !slug) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Title and URL slug parameters required.",
    );
  }

  try {
    const result = await cmsService.createPage({
      title,
      slug,
      content,
      metaTitle,
      metaDesc,
      template,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "CMS Page created successfully",
      data: {
        id: result.id,
        status: result.status,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new customError(httpStatus.BAD_REQUEST, message);
  }
});

const publishImpactStory = catchAsync(async (req, res) => {
  const { title, slug, content, beneficiaryId, campaignId, author } = req.body;

  if (!title || !slug || !content) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core publication parameters.",
    );
  }

  const result = await cmsService.publishImpactStory({
    title,
    slug,
    content,
    beneficiaryId,
    campaignId,
    publishedBy: author,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Editorial story published successfully",
    data: result,
  });
});

const updateSystemSetting = catchAsync(async (req, res) => {
  const key = (
    Array.isArray(req.params.key) ? req.params.key[0] : req.params.key
  ) as string;
  const { settingValue, description } = req.body;

  if (!key || settingValue === undefined) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Setting key and settingValue are required.",
    );
  }

  await cmsService.updateSystemSetting(key, {
    settingValue: settingValue.toString(),
    description,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "System setting updated successfully",
  });
});

export const cmsController = {
  createPage,
  publishImpactStory,
  updateSystemSetting,
};
