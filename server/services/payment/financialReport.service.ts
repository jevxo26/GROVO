import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface GenerateFinancialReportPayload {
  reportType: string; // DAILY, MONTHLY, ANNUAL, CUSTOM
  startDate: string | Date;
  endDate: string | Date;
  generatedBy?: string;
}

const generateFinancialReport = async (
  authenticatedUserId: string | undefined,
  payload: GenerateFinancialReportPayload
) => {
  if (!payload.reportType || !payload.startDate || !payload.endDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: reportType, startDate, and endDate.");
  }

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  if (startDate > endDate) {
    throw new customError(status.BAD_REQUEST, "startDate cannot be after endDate.");
  }

  // Aggregate total donations in date range with PAID status
  const donationSum = await prisma.donation.aggregate({
    where: {
      paymentStatus: PaymentStatus.PAID,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: { amount: true },
  });

  // Aggregate total project expenses in date range
  const expenseSum = await prisma.projectExpense.aggregate({
    where: {
      expenseDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: { amount: true },
  });

  const totalDonation = donationSum._sum.amount || 0;
  const totalExpense = expenseSum._sum.amount || 0;
  const netBalance = totalDonation - totalExpense;
  const generator = payload.generatedBy || authenticatedUserId || null;

  const report = await prisma.financialReport.create({
    data: {
      reportType: payload.reportType.toUpperCase(),
      startDate,
      endDate,
      totalDonation,
      totalExpense,
      netBalance,
      generatedBy: generator,
    },
    include: {
      generator: { select: { id: true, fullName: true, email: true } },
    },
  });

  return report;
};

const getAllFinancialReports = async (query?: {
  reportType?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.reportType) {
    where.reportType = query.reportType.toUpperCase();
  }

  const [reports, total] = await Promise.all([
    prisma.financialReport.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        generator: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.financialReport.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: reports,
  };
};

const getFinancialReportById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Report ID is required.");
  }

  const report = await prisma.financialReport.findUnique({
    where: { id },
    include: {
      generator: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!report) {
    throw new customError(status.NOT_FOUND, "Financial report not found.");
  }

  return report;
};

const deleteFinancialReport = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Report ID is required.");
  }

  const report = await prisma.financialReport.findUnique({
    where: { id },
  });

  if (!report) {
    throw new customError(status.NOT_FOUND, "Financial report not found.");
  }

  await prisma.financialReport.delete({
    where: { id },
  });

  return { message: "Financial report deleted successfully." };
};

export const financialReportService = {
  generateFinancialReport,
  getAllFinancialReports,
  getFinancialReportById,
  deleteFinancialReport,
};
