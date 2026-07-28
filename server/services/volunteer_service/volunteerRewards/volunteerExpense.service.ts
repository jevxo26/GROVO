import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 16. VOLUNTEER EXPENSE SERVICES ====================
export const createVolunteerExpense = async (payload: any) => {
  if (!payload.volunteerId || !payload.activityId || !payload.expenseType || payload.amount === undefined) {
    throw new customError(status.BAD_REQUEST, "volunteerId, activityId, expenseType, and amount are required.");
  }

  return await prisma.volunteerExpense.create({
    data: {
      volunteerId: payload.volunteerId,
      activityId: payload.activityId,
      expenseType: payload.expenseType,
      amount: Number(payload.amount),
      description: payload.description || null,
      receiptUrl: payload.receiptUrl || null,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllVolunteerExpenses = async (query?: { volunteerId?: string; activityId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.activityId) where.activityId = query.activityId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerExpense.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerExpenseById = async (id: string) => {
  const item = await prisma.volunteerExpense.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer expense record not found.");
  }
  return item;
};

export const updateVolunteerExpense = async (id: string, payload: any) => {
  const item = await prisma.volunteerExpense.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer expense record not found.");
  }

  return await prisma.volunteerExpense.update({
    where: { id },
    data: {
      ...(payload.expenseType && { expenseType: payload.expenseType }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.receiptUrl !== undefined && { receiptUrl: payload.receiptUrl }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteVolunteerExpense = async (id: string) => {
  const item = await prisma.volunteerExpense.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer expense record not found.");
  }
  await prisma.volunteerExpense.delete({ where: { id } });
  return { message: "Volunteer expense record deleted successfully." };
};
