import status from "http-status";
import { InvoiceStatus } from "../../../generated/prisma/enums";
import { invoiceService } from "../../services/payment/invoice.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createInvoice = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await invoiceService.createInvoice(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Invoice created successfully",
    data: result,
  });
});

const getInvoicesByDonorId = catchAsync(async (req, res) => {
  const donorId = (req.params.donorId as string) || req.user?.userId;
  const result = await invoiceService.getInvoicesByDonorId(donorId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor invoices fetched successfully",
    data: result,
  });
});

const getAllInvoices = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as InvoiceStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await invoiceService.getAllInvoices(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Invoices fetched successfully",
    data: result,
  });
});

const getInvoiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await invoiceService.getInvoiceById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Invoice fetched successfully",
    data: result,
  });
});

const getInvoiceByNumber = catchAsync(async (req, res) => {
  const { invoiceNumber } = req.params;
  const result = await invoiceService.getInvoiceByNumber(invoiceNumber as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Invoice fetched successfully",
    data: result,
  });
});

const updateInvoiceStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await invoiceService.updateInvoiceStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Invoice status updated successfully",
    data: result,
  });
});

const deleteInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await invoiceService.deleteInvoice(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Invoice deleted successfully",
    data: result,
  });
});

export const invoiceController = {
  createInvoice,
  getInvoicesByDonorId,
  getAllInvoices,
  getInvoiceById,
  getInvoiceByNumber,
  updateInvoiceStatus,
  deleteInvoice,
};
