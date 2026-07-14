import httpStatus from "http-status";
import customError from "../error/customError";
import { cmsService } from "../services/cms.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createPage = catchAsync(async (req, res) => {
  const { title, slug, metaTitle, metaDesc, template } = req.body;

  if (!title || !slug) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Title and URL slug parameters required.",
    );
  }

  const result = await cmsService.createPage({
    title,
    slug,
    metaTitle,
    metaDesc,
    template,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "CMS page created successfully",
    data: result,
  });
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

export const cmsController = {
  createPage,
  publishImpactStory,
};
