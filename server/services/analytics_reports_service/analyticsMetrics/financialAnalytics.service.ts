import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 12. FINANCIAL ANALYTICS SERVICES ====================
export const createFinancialAnalytics = async (payload: any) => {
  return await prisma.financialAnalytics.create({
    data: {
      reportDate: payload.reportDate ? new Date(payload.reportDate) : new Date(),
      income: payload.income ? Number(payload.income) : 0.0,
      expense: payload.expense ? Number(payload.expense) : 0.0,
      netBalance: payload.netBalance ? Number(payload.netBalance) : 0.0,
      pendingPayments: payload.pendingPayments ? Number(payload.pendingPayments) : 0.0,
      refundAmount: payload.refundAmount ? Number(payload.refundAmount) : 0.0,
    },
  });
};

export const getAllFinancialAnalytics = async () => {
  return await prisma.financialAnalytics.findMany({
    orderBy: { reportDate: "desc" },
  });
};

export const getFinancialAnalyticsById = async (id: string) => {
  const item = await prisma.financialAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Financial analytics record not found.");
  }
  return item;
};

export const updateFinancialAnalytics = async (id: string, payload: any) => {
  const item = await prisma.financialAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Financial analytics record not found.");
  }

  return await prisma.financialAnalytics.update({
    where: { id },
    data: {
      ...(payload.income !== undefined && { income: Number(payload.income) }),
      ...(payload.expense !== undefined && { expense: Number(payload.expense) }),
      ...(payload.netBalance !== undefined && { netBalance: Number(payload.netBalance) }),
      ...(payload.pendingPayments !== undefined && { pendingPayments: Number(payload.pendingPayments) }),
      ...(payload.refundAmount !== undefined && { refundAmount: Number(payload.refundAmount) }),
    },
  });
};

export const deleteFinancialAnalytics = async (id: string) => {
  const item = await prisma.financialAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Financial analytics record not found.");
  }
  await prisma.financialAnalytics.delete({ where: { id } });
  return { message: "Financial analytics record deleted successfully." };
};
