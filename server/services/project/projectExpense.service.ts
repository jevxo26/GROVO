import status from "http-status";
import { ExpenseStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectExpensePayload {
  projectId: string;
  expenseCategory: string;
  description: string;
  amount: number;
  expenseDate: string | Date;
  approvedBy?: string;
  status?: ExpenseStatus;
}

export interface UpdateProjectExpensePayload {
  expenseCategory?: string;
  description?: string;
  amount?: number;
  expenseDate?: string | Date;
  approvedBy?: string;
  status?: ExpenseStatus;
}

const createProjectExpense = async (approvedByUserId: string | undefined, payload: CreateProjectExpensePayload) => {
  if (!payload.projectId || !payload.expenseCategory || !payload.description || !payload.amount || !payload.expenseDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId, expenseCategory, description, amount, expenseDate.");
  }

  if (payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Amount must be greater than 0.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  const expense = await prisma.projectExpense.create({
    data: {
      projectId: payload.projectId,
      expenseCategory: payload.expenseCategory,
      description: payload.description,
      amount: payload.amount,
      expenseDate: new Date(payload.expenseDate),
      approvedBy: payload.approvedBy || approvedByUserId || null,
      status: payload.status || ExpenseStatus.PENDING,
    },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true },
      },
    },
  });

  return expense;
};

const getProjectExpensesByProjectId = async (
  projectId: string,
  query?: { status?: ExpenseStatus; category?: string; page?: number; limit?: number }
) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = { projectId };
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.category) {
    where.expenseCategory = query.category;
  }

  const [expenses, total, totalAmount] = await Promise.all([
    prisma.projectExpense.findMany({
      where,
      skip,
      take: limit,
      orderBy: { expenseDate: "desc" },
      include: {
        attachments: true,
      },
    }),
    prisma.projectExpense.count({ where }),
    prisma.projectExpense.aggregate({
      where,
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalExpenseAmount: totalAmount._sum.amount || 0,
    },
    data: expenses,
  };
};

const getProjectExpenseById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Expense ID is required.");
  }

  const expense = await prisma.projectExpense.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true, status: true },
      },
      attachments: true,
    },
  });

  if (!expense) {
    throw new customError(status.NOT_FOUND, "Project expense not found.");
  }

  return expense;
};

const updateProjectExpense = async (id: string, approvedByUserId: string | undefined, payload: UpdateProjectExpensePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Expense ID is required.");
  }

  const expense = await prisma.projectExpense.findUnique({
    where: { id },
  });

  if (!expense) {
    throw new customError(status.NOT_FOUND, "Project expense not found.");
  }

  if (payload.amount !== undefined && payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Amount must be greater than 0.");
  }

  const updatedExpense = await prisma.projectExpense.update({
    where: { id },
    data: {
      ...(payload.expenseCategory && { expenseCategory: payload.expenseCategory }),
      ...(payload.description && { description: payload.description }),
      ...(payload.amount !== undefined && { amount: payload.amount }),
      ...(payload.expenseDate && { expenseDate: new Date(payload.expenseDate) }),
      ...(payload.status && { status: payload.status }),
      ...(payload.approvedBy !== undefined
        ? { approvedBy: payload.approvedBy }
        : payload.status === ExpenseStatus.APPROVED && approvedByUserId
        ? { approvedBy: approvedByUserId }
        : {}),
    },
    include: {
      attachments: true,
    },
  });

  return updatedExpense;
};

const deleteProjectExpense = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Expense ID is required.");
  }

  const expense = await prisma.projectExpense.findUnique({
    where: { id },
  });

  if (!expense) {
    throw new customError(status.NOT_FOUND, "Project expense not found.");
  }

  await prisma.projectExpense.delete({
    where: { id },
  });

  return { message: "Project expense deleted successfully." };
};

export const projectExpenseService = {
  createProjectExpense,
  getProjectExpensesByProjectId,
  getProjectExpenseById,
  updateProjectExpense,
  deleteProjectExpense,
};
