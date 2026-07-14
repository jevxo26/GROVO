import { prisma } from "../lib/prisma";

const logAttendance = async (payload: {
  volunteerId: string;
  scheduleId: string;
  checkInTime: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const attendance = await tx.volunteerAttendance.create({
      data: {
        volunteerId: payload.volunteerId,
        scheduleId: payload.scheduleId,
        checkInTime: new Date(payload.checkInTime),
        attendanceStatus: "PRESENT",
      },
    });

    // Mark schedule as completed or in progress
    await tx.volunteerSchedule.update({
      where: { id: payload.scheduleId },
      data: { status: "COMPLETED" },
    });

    return attendance;
  });
};

const submitExpense = async (payload: {
  volunteerId: string;
  activityId: string;
  expenseType: string;
  amount: number;
  description?: string;
  receiptUrl?: string;
}) => {
  return await prisma.volunteerExpense.create({
    data: {
      volunteerId: payload.volunteerId,
      activityId: payload.activityId,
      expenseType: payload.expenseType,
      amount: parseFloat(payload.amount.toString()),
      description: payload.description,
      receiptUrl: payload.receiptUrl,
      status: "PENDING",
    },
  });
};

const approveExpense = async (expenseId: string, approvedBy: string) => {
  return await prisma.$transaction(async (tx: any) => {
    const expense = await tx.volunteerExpense.update({
      where: { id: expenseId },
      data: { status: "APPROVED" },
    });

    const reimbursement = await tx.volunteerReimbursement.create({
      data: {
        expenseId: expense.id,
        approvedAmount: expense.amount,
        approvedBy,
        paymentMethod: "CASH_OR_BANK",
        paymentStatus: "PAID",
        paidAt: new Date(),
      },
    });

    return { expense, reimbursement };
  });
};

const submitFieldReport = async (payload: {
  volunteerId: string;
  activity: string;
  description?: string;
  performedBy: string;
}) => {
  return await prisma.volunteerActivityLog.create({
    data: {
      volunteerId: payload.volunteerId,
      activity: payload.activity,
      description: payload.description,
      performedBy: payload.performedBy,
    },
  });
};

export const volunteerLogisticsService = {
  logAttendance,
  submitExpense,
  approveExpense,
  submitFieldReport,
};
