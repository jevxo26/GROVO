import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 17. VOLUNTEER REIMBURSEMENT SERVICES ====================
export const createVolunteerReimbursement = async (payload: any) => {
  if (!payload.expenseId || payload.approvedAmount === undefined || !payload.approvedBy || !payload.paymentMethod) {
    throw new customError(status.BAD_REQUEST, "expenseId, approvedAmount, approvedBy, and paymentMethod are required.");
  }

  const existing = await prisma.volunteerReimbursement.findUnique({
    where: { expenseId: payload.expenseId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Reimbursement already exists for this expense"
    );
  }

  return await prisma.volunteerReimbursement.create({
    data: {
      expenseId: payload.expenseId,
      approvedAmount: Number(payload.approvedAmount),
      approvedBy: payload.approvedBy,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentStatus || "PENDING",
      paidAt: payload.paidAt ? new Date(payload.paidAt) : null,
    },
  });
};

export const getAllVolunteerReimbursements = async (query?: { paymentStatus?: string; approvedBy?: string }) => {
  const where: any = {};
  if (query?.paymentStatus) where.paymentStatus = query.paymentStatus;
  if (query?.approvedBy) where.approvedBy = query.approvedBy;

  return await prisma.volunteerReimbursement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerReimbursementById = async (id: string) => {
  const item = await prisma.volunteerReimbursement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reimbursement record not found.");
  }
  return item;
};

