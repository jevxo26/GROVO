import status from "http-status";
import { ScheduleFrequency } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDonationSchedulePayload {
  donorId?: string;
  donationTypeId: string;
  amount: number;
  frequency?: ScheduleFrequency;
  startDate: string | Date;
  nextPaymentDate?: string | Date;
  endDate?: string | Date;
  autoRenew?: boolean;
  status?: string;
}

export interface UpdateDonationSchedulePayload {
  amount?: number;
  frequency?: ScheduleFrequency;
  startDate?: string | Date;
  nextPaymentDate?: string | Date;
  endDate?: string | Date;
  autoRenew?: boolean;
  status?: string;
}

const calculateNextPaymentDate = (startDate: Date, frequency: ScheduleFrequency): Date => {
  const next = new Date(startDate);
  if (frequency === ScheduleFrequency.WEEKLY) {
    next.setDate(next.getDate() + 7);
  } else if (frequency === ScheduleFrequency.YEARLY) {
    next.setFullYear(next.getFullYear() + 1);
  } else {
    // Default MONTHLY or CUSTOM
    next.setMonth(next.getMonth() + 1);
  }
  return next;
};

const createDonationSchedule = async (authenticatedUserId: string | undefined, payload: CreateDonationSchedulePayload) => {
  if (!payload.donationTypeId || !payload.amount || payload.amount <= 0 || !payload.startDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: donationTypeId, amount > 0, and startDate.");
  }

  const donorId = payload.donorId || authenticatedUserId;

  if (!donorId) {
    throw new customError(status.BAD_REQUEST, "Donor ID is required.");
  }

  const [donor, donationType] = await Promise.all([
    prisma.user.findUnique({ where: { id: donorId } }),
    prisma.donationType.findUnique({ where: { id: payload.donationTypeId } }),
  ]);

  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor user not found.");
  }

  if (!donationType) {
    throw new customError(status.NOT_FOUND, "Donation type not found.");
  }

  const startDate = new Date(payload.startDate);
  const frequency = payload.frequency || ScheduleFrequency.MONTHLY;
  const nextPaymentDate = payload.nextPaymentDate
    ? new Date(payload.nextPaymentDate)
    : calculateNextPaymentDate(startDate, frequency);

  const schedule = await prisma.donationSchedule.create({
    data: {
      donorId,
      donationTypeId: payload.donationTypeId,
      amount: payload.amount,
      frequency,
      startDate,
      nextPaymentDate,
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      autoRenew: payload.autoRenew !== undefined ? Boolean(payload.autoRenew) : true,
      status: payload.status || "ACTIVE",
    },
    include: {
      donor: { select: { id: true, fullName: true, email: true } },
      donationType: { select: { id: true, name: true } },
    },
  });

  return schedule;
};

const getDonationSchedulesByDonorId = async (donorId: string) => {
  if (!donorId) {
    throw new customError(status.BAD_REQUEST, "Donor ID is required.");
  }

  const schedules = await prisma.donationSchedule.findMany({
    where: { donorId },
    orderBy: { createdAt: "desc" },
    include: {
      donationType: { select: { id: true, name: true } },
      installments: { select: { id: true, installmentNo: true, amount: true, paymentStatus: true, dueDate: true } },
    },
  });

  return schedules;
};

const getAllDonationSchedules = async (query?: {
  frequency?: ScheduleFrequency;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (query?.frequency) {
    where.frequency = query.frequency;
  }
  if (query?.status) {
    where.status = query.status;
  }

  const [schedules, total] = await Promise.all([
    prisma.donationSchedule.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donor: { select: { id: true, fullName: true, email: true } },
        donationType: { select: { id: true, name: true } },
        _count: { select: { installments: true } },
      },
    }),
    prisma.donationSchedule.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: schedules,
  };
};

const getDonationScheduleById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Schedule ID is required.");
  }

  const schedule = await prisma.donationSchedule.findUnique({
    where: { id },
    include: {
      donor: { select: { id: true, fullName: true, email: true, phone: true } },
      donationType: true,
      installments: { orderBy: { installmentNo: "asc" } },
    },
  });

  if (!schedule) {
    throw new customError(status.NOT_FOUND, "Donation schedule record not found.");
  }

  return schedule;
};

const updateDonationSchedule = async (id: string, payload: UpdateDonationSchedulePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Schedule ID is required.");
  }

  const schedule = await prisma.donationSchedule.findUnique({
    where: { id },
  });

  if (!schedule) {
    throw new customError(status.NOT_FOUND, "Donation schedule record not found.");
  }

  const updatedSchedule = await prisma.donationSchedule.update({
    where: { id },
    data: {
      ...(payload.amount !== undefined && { amount: payload.amount }),
      ...(payload.frequency && { frequency: payload.frequency }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.nextPaymentDate !== undefined && { nextPaymentDate: payload.nextPaymentDate ? new Date(payload.nextPaymentDate) : null }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.autoRenew !== undefined && { autoRenew: payload.autoRenew }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedSchedule;
};

const deleteDonationSchedule = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Schedule ID is required.");
  }

  const schedule = await prisma.donationSchedule.findUnique({
    where: { id },
    include: { _count: { select: { installments: true } } },
  });

  if (!schedule) {
    throw new customError(status.NOT_FOUND, "Donation schedule record not found.");
  }

  if (schedule._count.installments > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete schedule with generated installments. Update status to CANCELLED instead."
    );
  }

  await prisma.donationSchedule.delete({
    where: { id },
  });

  return { message: "Donation schedule deleted successfully." };
};

export const donationScheduleService = {
  createDonationSchedule,
  getDonationSchedulesByDonorId,
  getAllDonationSchedules,
  getDonationScheduleById,
  updateDonationSchedule,
  deleteDonationSchedule,
};
