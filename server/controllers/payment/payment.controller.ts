import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { paymentService } from "../../services/payment/payment.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const initiatePayment = catchAsync(async (req, res) => {
  const result = await paymentService.initiatePayment(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Payment initiated successfully",
    data: result,
  });
});

const getPaymentsByDonationId = catchAsync(async (req, res) => {
  const { donationId } = req.params;
  const result = await paymentService.getPaymentsByDonationId(donationId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation payments fetched successfully",
    data: result,
  });
});

const getAllPayments = catchAsync(async (req, res) => {
  const query = {
    paymentMethod: req.query.paymentMethod as string | undefined,
    paymentGatewayId: req.query.paymentGatewayId as string | undefined,
    paymentStatus: req.query.paymentStatus as PaymentStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await paymentService.getAllPayments(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payments fetched successfully",
    data: result,
  });
});

const getPaymentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentService.getPaymentById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment fetched successfully",
    data: result,
  });
});

const getPaymentByTransactionId = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await paymentService.getPaymentByTransactionId(transactionId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment fetched successfully",
    data: result,
  });
});

const updatePaymentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentService.updatePaymentStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment status updated successfully",
    data: result,
  });
});

const deletePayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentService.deletePayment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment deleted successfully",
    data: result,
  });
});

export const paymentController = {
  initiatePayment,
  getPaymentsByDonationId,
  getAllPayments,
  getPaymentById,
  getPaymentByTransactionId,
  updatePaymentStatus,
  deletePayment,
};
