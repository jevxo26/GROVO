import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateExpenseAttachmentPayload {
  expenseId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
}

const addExpenseAttachment = async (uploadedByUserId: string | undefined, payload: CreateExpenseAttachmentPayload) => {
  if (!payload.expenseId || !payload.fileName || !payload.fileUrl || !payload.fileType) {
    throw new customError(status.BAD_REQUEST, "Required fields: expenseId, fileName, fileUrl, fileType.");
  }

  const expense = await prisma.projectExpense.findUnique({
    where: { id: payload.expenseId },
  });

  if (!expense) {
    throw new customError(status.NOT_FOUND, "Project expense record not found.");
  }

  const attachment = await prisma.expenseAttachment.create({
    data: {
      expenseId: payload.expenseId,
      fileName: payload.fileName,
      fileUrl: payload.fileUrl,
      fileType: payload.fileType,
      uploadedBy: uploadedByUserId || null,
    },
  });

  return attachment;
};

const getAttachmentsByExpenseId = async (expenseId: string) => {
  if (!expenseId) {
    throw new customError(status.BAD_REQUEST, "Expense ID is required.");
  }

  const attachments = await prisma.expenseAttachment.findMany({
    where: { expenseId },
    orderBy: { createdAt: "desc" },
  });

  return attachments;
};

const getExpenseAttachmentById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Attachment ID is required.");
  }

  const attachment = await prisma.expenseAttachment.findUnique({
    where: { id },
    include: {
      expense: {
        select: { id: true, expenseCategory: true, description: true, amount: true },
      },
    },
  });

  if (!attachment) {
    throw new customError(status.NOT_FOUND, "Expense attachment not found.");
  }

  return attachment;
};

const deleteExpenseAttachment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Attachment ID is required.");
  }

  const attachment = await prisma.expenseAttachment.findUnique({
    where: { id },
  });

  if (!attachment) {
    throw new customError(status.NOT_FOUND, "Expense attachment not found.");
  }

  await prisma.expenseAttachment.delete({
    where: { id },
  });

  return { message: "Expense attachment deleted successfully." };
};

export const expenseAttachmentService = {
  addExpenseAttachment,
  getAttachmentsByExpenseId,
  getExpenseAttachmentById,
  deleteExpenseAttachment,
};
