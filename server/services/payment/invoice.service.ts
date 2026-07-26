import status from "http-status";
import { InvoiceStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateInvoicePayload {
  donationId?: string;
  donorId?: string;
  amount: number;
  tax?: number;
  invoiceUrl?: string;
  status?: InvoiceStatus;
}

export interface UpdateInvoiceStatusPayload {
  status: InvoiceStatus;
  invoiceUrl?: string;
}

const generateInvoiceNumber = async (): Promise<string> => {
  const year = new Date().getFullYear();
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    code = `INV-${year}-${randomDigits}`;
    const existing = await prisma.invoice.findUnique({
      where: { invoiceNumber: code },
    });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

const createInvoice = async (authenticatedUserId: string | undefined, payload: CreateInvoicePayload) => {
  if (!payload.amount || payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Invoice amount must be greater than 0.");
  }

  const donorId = payload.donorId || authenticatedUserId || null;

  if (payload.donationId) {
    const donation = await prisma.donation.findUnique({
      where: { id: payload.donationId },
    });
    if (!donation) {
      throw new customError(status.NOT_FOUND, "Donation record not found.");
    }
  }

  if (donorId) {
    const donor = await prisma.user.findUnique({
      where: { id: donorId },
    });
    if (!donor) {
      throw new customError(status.NOT_FOUND, "Donor user not found.");
    }
  }

  const invoiceNumber = await generateInvoiceNumber();
  const tax = payload.tax && payload.tax >= 0 ? payload.tax : 0;
  const totalAmount = payload.amount + tax;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      donationId: payload.donationId || null,
      donorId,
      amount: payload.amount,
      tax,
      totalAmount,
      invoiceUrl: payload.invoiceUrl || null,
      status: payload.status || InvoiceStatus.UNPAID,
    },
    include: {
      donation: { select: { id: true, donationNumber: true, paymentStatus: true } },
      donor: { select: { id: true, fullName: true, email: true } },
    },
  });

  return invoice;
};

const getInvoicesByDonorId = async (donorId: string) => {
  if (!donorId) {
    throw new customError(status.BAD_REQUEST, "Donor ID is required.");
  }

  const invoices = await prisma.invoice.findMany({
    where: { donorId },
    orderBy: { createdAt: "desc" },
    include: {
      donation: { select: { id: true, donationNumber: true } },
    },
  });

  return invoices;
};

const getAllInvoices = async (query?: {
  status?: InvoiceStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { invoiceNumber: { contains: query.search, mode: "insensitive" } },
      { donor: { fullName: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [invoices, total, totalPaidSum] = await Promise.all([
    prisma.invoice.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donation: { select: { id: true, donationNumber: true } },
        donor: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.invoice.count({ where }),
    prisma.invoice.aggregate({
      where: { ...where, status: InvoiceStatus.PAID },
      _sum: { totalAmount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalPaidInvoicesAmount: totalPaidSum._sum.totalAmount || 0,
    },
    data: invoices,
  };
};

const getInvoiceById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Invoice ID is required.");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      donation: {
        include: {
          campaign: { select: { id: true, title: true } },
          project: { select: { id: true, projectName: true } },
        },
      },
      donor: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!invoice) {
    throw new customError(status.NOT_FOUND, "Invoice record not found.");
  }

  return invoice;
};

const getInvoiceByNumber = async (invoiceNumber: string) => {
  if (!invoiceNumber) {
    throw new customError(status.BAD_REQUEST, "Invoice number is required.");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNumber },
    include: {
      donation: { select: { id: true, donationNumber: true } },
      donor: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!invoice) {
    throw new customError(status.NOT_FOUND, "Invoice record not found.");
  }

  return invoice;
};

const updateInvoiceStatus = async (id: string, payload: UpdateInvoiceStatusPayload) => {
  if (!id || !payload.status) {
    throw new customError(status.BAD_REQUEST, "Invoice ID and status are required.");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice) {
    throw new customError(status.NOT_FOUND, "Invoice record not found.");
  }

  const updatedInvoice = await prisma.invoice.update({
    where: { id },
    data: {
      status: payload.status,
      ...(payload.invoiceUrl !== undefined && { invoiceUrl: payload.invoiceUrl }),
    },
  });

  return updatedInvoice;
};

const deleteInvoice = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Invoice ID is required.");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice) {
    throw new customError(status.NOT_FOUND, "Invoice record not found.");
  }

  await prisma.invoice.delete({
    where: { id },
  });

  return { message: "Invoice deleted successfully." };
};

export const invoiceService = {
  createInvoice,
  getInvoicesByDonorId,
  getAllInvoices,
  getInvoiceById,
  getInvoiceByNumber,
  updateInvoiceStatus,
  deleteInvoice,
};
