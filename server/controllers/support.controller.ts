import httpStatus from "http-status";
import customError from "../error/customError";
import { supportService } from "../services/support.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const openTicket = catchAsync(async (req, res) => {
  const { subject, description, category, priority } = req.body;
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";

  if (!subject || !description || !category) {
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
    statusCode: httpStatus.CREATED,
    message: "Support ticket opened successfully",
    data: result,
  });
});

const submitReply = catchAsync(async (req, res) => {
  const ticketId = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) || req.body.ticketId;
  const { message, isStaff } = req.body;
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";

  if (!ticketId || !message) {
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
    statusCode: httpStatus.CREATED,
    message: "Ticket reply submitted successfully",
    data: result,
  });
});

const getTicketDetail = catchAsync(async (req, res) => {
  const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const userRole = (req.headers["x-user-role"] as string) || "user";
  const isAdmin = userRole === "admin" || userRole === "super-admin";

  const result = await supportService.getTicketDetail(id, userId, isAdmin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Ticket retrieved successfully",
    data: result,
  });
});

const listMyTickets = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const { status, category, page, limit } = req.query;

  const result = await supportService.listMyTickets(userId, {
    status: status as string,
    category: category as string,
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tickets retrieved successfully",
    data: result.tickets,
    meta: result.meta,
  });
});

const listAllTickets = catchAsync(async (req, res) => {
  const { status, priority, category, assignedTo, page, limit, sort } = req.query;

  const result = await supportService.listAllTickets({
    status: status as string,
    priority: priority as string,
    category: category as string,
    assignedTo: assignedTo as string,
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
    sort: sort as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Tickets retrieved successfully",
    data: result.tickets,
    meta: result.meta,
  });
});

export const supportController = {
  openTicket,
  submitReply,
  getTicketDetail,
  listMyTickets,
  listAllTickets,
};
