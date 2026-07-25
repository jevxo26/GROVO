import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreatePayoutPayload {
  branchId?: string;
  projectId?: string;
  amount: number;
  paymentMethod: string;
  approvedBy?: string;
  paymentStatus?: PaymentStatus;
  paidAt?: string | Date;
}

export interface UpdatePayoutStatusPayload {
  paymentStatus: PaymentStatus;
  paidAt?: string | Date;
}

const createPayout = async (authenticatedUserId: string | undefined, payload: CreatePayoutPayload) => {
  if (!payload.amount || payload.amount <= 0 || !payload.paymentMethod) {
    throw new customError(status.BAD_REQUEST, "Required fields: amount > 0 and paymentMethod.");
  }

  if (payload.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: payload.projectId },
    });
    if (!project) {
      throw new customError(status.NOT_FOUND, "Project record not found.");
    }
  }

  const approver = payload.approvedBy || authenticatedUserId || null;
  const initialStatus = payload.paymentStatus || PaymentStatus.PENDING;
  const paidAt = initialStatus === PaymentStatus.PAID
    ? (payload.paidAt ? new Date(payload.paidAt) : new Date())
    : null;

  const payout = await prisma.payout.create({
    data: {
      branchId: payload.branchId || null,
      projectId: payload.projectId || null,
      amount: payload.amount,
      paymentMethod: payload.paymentMethod,
      approvedBy: approver,
      paymentStatus: initialStatus,
      paidAt,
    },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  return payout;
};

const getPayoutsByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const payouts = await prisma.payout.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    include: {
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  return payouts;
};

const getAllPayouts = async (query?: {
  branchId?: string;
  projectId?: string;
  paymentStatus?: PaymentStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }

  if (query?.projectId) {
    where.projectId = query.projectId;
  }

  if (query?.paymentStatus) {
    where.paymentStatus = query.paymentStatus;
  }

  if (query?.search) {
    where.OR = [
      { paymentMethod: { contains: query.search, mode: "insensitive" } },
      { project: { projectName: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [payouts, total, aggregate] = await Promise.all([
    prisma.payout.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        project: { select: { id: true, projectName: true, projectCode: true } },
        approver: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.payout.count({ where }),
    prisma.payout.aggregate({
      where: { ...where, paymentStatus: PaymentStatus.PAID },
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalPaidPayoutsAmount: aggregate._sum.amount || 0,
    },
    data: payouts,
  };
};

const getPayoutById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Payout ID is required.");
  }

  const payout = await prisma.payout.findUnique({
    where: { id },
    include: {
      project: true,
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!payout) {
    throw new customError(status.NOT_FOUND, "Payout record not found.");
  }

  return payout;
};

const updatePayoutStatus = async (id: string, payload: UpdatePayoutStatusPayload) => {
  if (!id || !payload.paymentStatus) {
    throw new customError(status.BAD_REQUEST, "Payout ID and paymentStatus are required.");
  }

  const payout = await prisma.payout.findUnique({
    where: { id },
  });

  if (!payout) {
    throw new customError(status.NOT_FOUND, "Payout record not found.");
  }

  const paidAt = payload.paymentStatus === PaymentStatus.PAID
    ? (payload.paidAt ? new Date(payload.paidAt) : new Date())
    : null;

  const updatedPayout = await prisma.payout.update({
    where: { id },
    data: {
      paymentStatus: payload.paymentStatus,
      paidAt,
    },
  });

  return updatedPayout;
};

const deletePayout = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Payout ID is required.");
  }

  const payout = await prisma.payout.findUnique({
    where: { id },
  });

  if (!payout) {
    throw new customError(status.NOT_FOUND, "Payout record not found.");
  }

  await prisma.payout.delete({
    where: { id },
  });

  return { message: "Payout record deleted successfully." };
};

export const payoutService = {
  createPayout,
  getPayoutsByProjectId,
  getAllPayouts,
  getPayoutById,
  updatePayoutStatus,
  deletePayout,
};
