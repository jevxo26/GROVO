import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchExpensePayload {
  branchBudgetId: string;
  expenseCategory: string;
  amount: number;
  description?: string;
  approvedBy?: string;
  expenseDate: string | Date;
}

export interface UpdateBranchExpensePayload {
  branchBudgetId?: string;
  expenseCategory?: string;
  amount?: number;
  description?: string;
  approvedBy?: string;
  expenseDate?: string | Date;
}

const createBranchExpense = async (payload: CreateBranchExpensePayload) => {
  if (!payload.branchBudgetId || !payload.expenseCategory || payload.amount === undefined || !payload.expenseDate) {
    throw new customError(status.BAD_REQUEST, "Branch Budget ID, Expense Category, Amount, and Expense Date are required.");
  }

  if (payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Expense amount must be greater than zero.");
  }

  const result = await prisma.$transaction(async (tx) => {
    const budget = await tx.branchBudget.findUnique({
      where: { id: payload.branchBudgetId },
    });

    if (!budget) {
      throw new customError(status.NOT_FOUND, "Branch Budget record not found.");
    }

    if (budget.remainingBudget < payload.amount) {
      throw new customError(
        status.BAD_REQUEST,
        `Insufficient remaining budget. Available: ${budget.remainingBudget}, Requested: ${payload.amount}`
      );
    }

    if (payload.approvedBy) {
      const user = await tx.user.findUnique({ where: { id: payload.approvedBy } });
      if (!user) {
        throw new customError(status.NOT_FOUND, "Approver user not found.");
      }
    }

    // Update parent budget
    await tx.branchBudget.update({
      where: { id: payload.branchBudgetId },
      data: {
        usedBudget: { increment: payload.amount },
        remainingBudget: { decrement: payload.amount },
      },
    });

    // Create the expense record
    const expense = await tx.branchExpense.create({
      data: {
        branchBudgetId: payload.branchBudgetId,
        expenseCategory: payload.expenseCategory,
        amount: payload.amount,
        description: payload.description || null,
        approvedBy: payload.approvedBy || null,
        expenseDate: new Date(payload.expenseDate),
      },
      include: {
        budget: { select: { id: true, fiscalYear: true, branch: { select: { id: true, branchName: true } } } },
        approver: { select: { id: true, fullName: true, email: true } },
      },
    });

    return expense;
  });

  return result;
};

const getAllBranchExpenses = async (query?: { branchBudgetId?: string; approvedBy?: string; expenseCategory?: string }) => {
  const where: any = {};

  if (query?.branchBudgetId) {
    where.branchBudgetId = query.branchBudgetId;
  }
  if (query?.approvedBy) {
    where.approvedBy = query.approvedBy;
  }
  if (query?.expenseCategory) {
    where.expenseCategory = query.expenseCategory;
  }

  const expenses = await prisma.branchExpense.findMany({
    where,
    orderBy: { expenseDate: "desc" },
    include: {
      budget: { select: { id: true, fiscalYear: true, branch: { select: { id: true, branchName: true, branchCode: true } } } },
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  return expenses;
};

const getBranchExpenseById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Expense ID is required.");
  }

  const expense = await prisma.branchExpense.findUnique({
    where: { id },
    include: {
      budget: { include: { branch: true } },
      approver: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!expense) {
    throw new customError(status.NOT_FOUND, "Branch Expense record not found.");
  }

  return expense;
};

const updateBranchExpense = async (id: string, payload: UpdateBranchExpensePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Expense ID is required.");
  }

  const result = await prisma.$transaction(async (tx) => {
    const expense = await tx.branchExpense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new customError(status.NOT_FOUND, "Branch Expense record not found.");
    }

    if (payload.approvedBy) {
      const user = await tx.user.findUnique({ where: { id: payload.approvedBy } });
      if (!user) {
        throw new customError(status.NOT_FOUND, "Approver user not found.");
      }
    }

    const targetBudgetId = payload.branchBudgetId || expense.branchBudgetId;
    const currentBudget = await tx.branchBudget.findUnique({ where: { id: expense.branchBudgetId } });
    const targetBudget = targetBudgetId === expense.branchBudgetId ? currentBudget : await tx.branchBudget.findUnique({ where: { id: targetBudgetId } });

    if (!currentBudget || !targetBudget) {
      throw new customError(status.NOT_FOUND, "Branch Budget record not found.");
    }

    const oldAmount = expense.amount;
    const newAmount = payload.amount !== undefined ? payload.amount : oldAmount;

    if (newAmount <= 0) {
      throw new customError(status.BAD_REQUEST, "Expense amount must be greater than zero.");
    }

    if (targetBudgetId === expense.branchBudgetId) {
      // Adjustment within same budget
      const difference = newAmount - oldAmount;
      if (difference > 0 && currentBudget.remainingBudget < difference) {
        throw new customError(
          status.BAD_REQUEST,
          `Insufficient remaining budget. Available extra: ${currentBudget.remainingBudget}, Required adjustment: ${difference}`
        );
      }

      await tx.branchBudget.update({
        where: { id: expense.branchBudgetId },
        data: {
          usedBudget: { increment: difference },
          remainingBudget: { decrement: difference },
        },
      });
    } else {
      // Re-assigning to a different budget:
      // 1. Revert from old budget
      await tx.branchBudget.update({
        where: { id: expense.branchBudgetId },
        data: {
          usedBudget: { decrement: oldAmount },
          remainingBudget: { increment: oldAmount },
        },
      });

      // 2. Validate and apply to new budget
      if (targetBudget.remainingBudget < newAmount) {
        throw new customError(
          status.BAD_REQUEST,
          `Insufficient remaining budget in the target budget. Available: ${targetBudget.remainingBudget}, Requested: ${newAmount}`
        );
      }

      await tx.branchBudget.update({
        where: { id: targetBudgetId },
        data: {
          usedBudget: { increment: newAmount },
          remainingBudget: { decrement: newAmount },
        },
      });
    }

    const updatedExpense = await tx.branchExpense.update({
      where: { id },
      data: {
        ...(payload.branchBudgetId && { branchBudgetId: payload.branchBudgetId }),
        ...(payload.expenseCategory && { expenseCategory: payload.expenseCategory }),
        ...(payload.amount !== undefined && { amount: payload.amount }),
        ...(payload.description !== undefined && { description: payload.description }),
        ...(payload.approvedBy !== undefined && { approvedBy: payload.approvedBy }),
        ...(payload.expenseDate && { expenseDate: new Date(payload.expenseDate) }),
      },
    });

    return updatedExpense;
  });

  return result;
};

const deleteBranchExpense = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Expense ID is required.");
  }

  await prisma.$transaction(async (tx) => {
    const expense = await tx.branchExpense.findUnique({ where: { id } });
    if (!expense) {
      throw new customError(status.NOT_FOUND, "Branch Expense record not found.");
    }

    // Revert parent budget allocations
    await tx.branchBudget.update({
      where: { id: expense.branchBudgetId },
      data: {
        usedBudget: { decrement: expense.amount },
        remainingBudget: { increment: expense.amount },
      },
    });

    await tx.branchExpense.delete({ where: { id } });
  });

  return { message: "Branch Expense record deleted successfully." };
};

export const branchExpenseService = {
  createBranchExpense,
  getAllBranchExpenses,
  getBranchExpenseById,
  updateBranchExpense,
  deleteBranchExpense,
};
