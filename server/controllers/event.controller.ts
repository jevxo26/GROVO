import httpStatus from "http-status";
import customError from "../error/customError";
import { eventService } from "../services/event.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const scheduleEvent = catchAsync(async (req, res) => {
  const {
    title,
    slug,
    categoryId,
    eventType,
    branchId,
    venue,
    startDate,
    endDate,
    description,
    maxParticipants,
    registrationRequired,
  } = req.body;

  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!title || !slug || !branchId || !categoryId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core scheduling records.",
    );
  }

  const result = await eventService.scheduleEvent({
    title,
    slug,
    categoryId,
    eventType: eventType || "CAMPAIGN_LAUNCH",
    branchId,
    venue: venue || "Head Office",
    startDate,
    endDate,
    createdBy: adminId,
    description,
    maxParticipants: maxParticipants ? Number(maxParticipants) : undefined,
    registrationRequired: registrationRequired === "true" || registrationRequired === true,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Event scheduled successfully",
    data: result,
  });
});

const logAttendance = catchAsync(async (req, res) => {
  const { eventId, userId, checkInTime } = req.body;

  if (!eventId || !userId || !checkInTime) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required attendance parameters.",
    );
  }

  const result = await eventService.logAttendance({
    eventId,
    userId,
    checkInTime,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Check-in telemetry recorded successfully",
    data: result,
  });
});

const registerForEvent = catchAsync(async (req, res) => {
  const eventId = req.params.id as string;
  const userId = req.headers["x-user-id"] as string || "user-mock";

  const result = await eventService.registerForEvent(eventId, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Event registration completed successfully",
    data: result,
  });
});

const addMediaToAlbum = catchAsync(async (req, res) => {
  const albumId = req.params.id as string;
  const { title, mediaType, fileUrl } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!title || !mediaType || !fileUrl) {
    throw new customError(httpStatus.BAD_REQUEST, "title, mediaType, and fileUrl are required.");
  }

  const result = await eventService.addMediaToAlbum(albumId, {
    title,
    mediaType,
    fileUrl,
    uploadedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Media item added to album successfully",
    data: result,
  });
});

const getLiveDonationFeed = catchAsync(async (req, res) => {
  const result = await eventService.getLiveDonationFeed();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Live donation feed retrieved successfully",
    data: result,
  });
});

const createSuccessStory = catchAsync(async (req, res) => {
  const { title, slug, summary, content, beneficiaryId, campaignId } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!title || !slug || !content) {
    throw new customError(httpStatus.BAD_REQUEST, "title, slug, and content are required.");
  }

  const result = await eventService.createSuccessStory({
    title,
    slug,
    summary,
    content,
    beneficiaryId,
    campaignId,
    publishedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Success story published successfully",
    data: result,
  });
});

const sendNewsletter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventService.sendNewsletter(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Newsletter dispatched successfully",
    data: result,
  });
});

export const eventController = {
  scheduleEvent,
  logAttendance,
  registerForEvent,
  addMediaToAlbum,
  getLiveDonationFeed,
  createSuccessStory,
  sendNewsletter,
};
