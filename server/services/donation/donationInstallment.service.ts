import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface GenerateInstallmentPayload {
  scheduleId: string;
  installmentNo?: number;
  amount?: number;
  dueDate: string | Date;
  paymentStatus?: PaymentStatus;
}

export interface UpdateInstallmentStatusPayload {
  paymentStatus: PaymentStatus;
  paidDate?: string | Date;
}

const generateInstallment = async (payload: GenerateInstallmentPayload) => {
  if (!payload.scheduleId || !payload.dueDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: scheduleId and dueDate.");
  }

  const schedule = await prisma.donationSchedule.findUnique({
    where: { id: payload.scheduleId },
    include: {
      _count: { select: { installments: true } },
    },
  });

  if (!schedule) {
    throw new customError(status.NOT_FOUND, "Donation schedule record not found.");
  }

  const installmentNo = payload.installmentNo !== undefined
    ? payload.installmentNo
    : schedule._count.installments + 1;

  const amount = payload.amount !== undefined ? payload.amount : schedule.amount;
  const initialPaymentStatus = payload.paymentStatus || PaymentStatus.PENDING;

  const installment = await prisma.donationInstallment.create({
    data: {
      scheduleId: payload.scheduleId,
      installmentNo,
      amount,
      dueDate: new Date(payload.dueDate),
      paidDate: initialPaymentStatus === PaymentStatus.PAID ? new Date() : null,
      paymentStatus: initialPaymentStatus,
    },
    include: {
      schedule: {
        select: { id: true, amount: true, frequency: true, donor: { select: { id: true, fullName: true, email: true } } },
      },
    },
  });

  return installment;
};

const getInstallmentsByScheduleId = async (scheduleId: string) => {
  if (!scheduleId) {
    throw new customError(status.BAD_REQUEST, "Schedule ID is required.");
  }

  const installments = await prisma.donationInstallment.findMany({
    where: { scheduleId },
    orderBy: { installmentNo: "asc" },
  });

  return installments;
};

const getDonationInstallmentById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Installment ID is required.");
  }

  const installment = await prisma.donationInstallment.findUnique({
    where: { id },
    include: {
      schedule: {
        include: {
          donor: { select: { id: true, fullName: true, email: true } },
          donationType: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!installment) {
    throw new customError(status.NOT_FOUND, "Donation installment record not found.");
  }

  return installment;
};

const updateInstallmentStatus = async (id: string, payload: UpdateInstallmentStatusPayload) => {
  if (!id || !payload.paymentStatus) {
    throw new customError(status.BAD_REQUEST, "Installment ID and paymentStatus are required.");
  }

  const installment = await prisma.donationInstallment.findUnique({
    where: { id },
  });

  if (!installment) {
    throw new customError(status.NOT_FOUND, "Donation installment record not found.");
  }

  const paidDate = payload.paymentStatus === PaymentStatus.PAID
    ? (payload.paidDate ? new Date(payload.paidDate) : new Date())
    : null;

  const updatedInstallment = await prisma.donationInstallment.update({
    where: { id },
    data: {
      paymentStatus: payload.paymentStatus,
      paidDate,
    },
  });

  return updatedInstallment;
};

const deleteDonationInstallment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Installment ID is required.");
  }

  const installment = await prisma.donationInstallment.findUnique({
    where: { id },
  });

  if (!installment) {
    throw new customError(status.NOT_FOUND, "Donation installment record not found.");
  }

  await prisma.donationInstallment.delete({
    where: { id },
  });

  return { message: "Donation installment deleted successfully." };
};

export const donationInstallmentService = {
  generateInstallment,
  getInstallmentsByScheduleId,
  getDonationInstallmentById,
  updateInstallmentStatus,
  deleteDonationInstallment,
};
