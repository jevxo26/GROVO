import status from "http-status";
import { TransactionStatus } from "../../../generated/prisma/enums";
import { paymentTransactionService } from "../../services/payment/paymentTransaction.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const recordPaymentTransaction = catchAsync(async (req, res) => {
  const result = await paymentTransactionService.recordPaymentTransaction(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Payment transaction recorded successfully",
    data: result,
  });
});

const getTransactionsByPaymentId = catchAsync(async (req, res) => {
  const { paymentId } = req.params;
  const result = await paymentTransactionService.getTransactionsByPaymentId(paymentId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment transactions fetched successfully",
    data: result,
  });
});

const getAllPaymentTransactions = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as TransactionStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await paymentTransactionService.getAllPaymentTransactions(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment transactions fetched successfully",
    data: result,
  });
});

const getPaymentTransactionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentTransactionService.getPaymentTransactionById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment transaction fetched successfully",
    data: result,
  });
});

const deletePaymentTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentTransactionService.deletePaymentTransaction(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment transaction deleted successfully",
    data: result,
  });
});

export const paymentTransactionController = {
  recordPaymentTransaction,
  getTransactionsByPaymentId,
  getAllPaymentTransactions,
  getPaymentTransactionById,
  deletePaymentTransaction,
};
