import status from "http-status";
import { expenseAttachmentService } from "../../services/project/expenseAttachment.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const addExpenseAttachment = catchAsync(async (req, res) => {
  const uploadedByUserId = req.user?.userId;
  const result = await expenseAttachmentService.addExpenseAttachment(uploadedByUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Expense attachment uploaded successfully",
    data: result,
  });
});

const getAttachmentsByExpenseId = catchAsync(async (req, res) => {
  const { expenseId } = req.params;
  const result = await expenseAttachmentService.getAttachmentsByExpenseId(expenseId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Expense attachments fetched successfully",
    data: result,
  });
});

const getExpenseAttachmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await expenseAttachmentService.getExpenseAttachmentById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Expense attachment fetched successfully",
    data: result,
  });
});

const deleteExpenseAttachment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await expenseAttachmentService.deleteExpenseAttachment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Expense attachment deleted successfully",
    data: result,
  });
});

export const expenseAttachmentController = {
  addExpenseAttachment,
  getAttachmentsByExpenseId,
  getExpenseAttachmentById,
  deleteExpenseAttachment,
};
