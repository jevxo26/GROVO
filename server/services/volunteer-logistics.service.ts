import { prisma } from "../lib/prisma";

const logAttendance = async (payload: {
  volunteerId: string;
  scheduleId: string;
  checkInTime: string;
}) => {
  return await prisma.volunteerAttendance.create({
    data: {
      volunteerId: payload.volunteerId,
      scheduleId: payload.scheduleId,
      checkInTime: new Date(payload.checkInTime),
      attendanceStatus: "PRESENT",
    },
  });
};

const submitExpense = async (payload: {
  volunteerId: string;
  activityId: string;
  expenseType: string;
  amount: number;
  description?: string;
}) => {
  return await prisma.volunteerExpense.create({
    data: {
      volunteerId: payload.volunteerId,
      activityId: payload.activityId,
      expenseType: payload.expenseType,
      amount: parseFloat(payload.amount.toString()),
      description: payload.description,
      status: "PENDING",
    },
  });
};

export const volunteerLogisticsService = {
  logAttendance,
  submitExpense,
};
