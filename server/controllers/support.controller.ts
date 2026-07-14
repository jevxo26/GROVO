import httpStatus from "http-status";
import customError from "../error/customError";
import { supportService } from "../services/support.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const openTicket = catchAsync(async (req, res) => {
  const { userId, subject, description, category, priority } = req.body;

  if (!userId || !subject || !description) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core support fields.",
    );
  }

  const result = await supportService.openTicket({
    userId,
    subject,
    description,
    category,
    priority,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Support ticket opened successfully",
    data: result,
  });
});

const submitReply = catchAsync(async (req, res) => {
  const { ticketId, userId, message, isStaff } = req.body;

  if (!ticketId || !userId || !message) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required reply parameters.",
    );
  }

  const result = await supportService.submitReply({
    ticketId,
    userId,
    message,
    isStaff: Boolean(isStaff),
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Ticket reply submitted successfully",
    data: result,
  });
});

export const supportController = {
  openTicket,
  submitReply,
};
