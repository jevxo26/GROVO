import status from "http-status";
import { paymentWebhookService } from "../../services/payment/paymentWebhook.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const recordPaymentWebhook = catchAsync(async (req, res) => {
  const result = await paymentWebhookService.recordPaymentWebhook(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Payment webhook notification recorded successfully",
    data: result,
  });
});

const getWebhooksByPaymentId = catchAsync(async (req, res) => {
  const { paymentId } = req.params;
  const result = await paymentWebhookService.getWebhooksByPaymentId(paymentId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment webhooks fetched successfully",
    data: result,
  });
});

const getAllPaymentWebhooks = catchAsync(async (req, res) => {
  const query = {
    gateway: req.query.gateway as string | undefined,
    verificationStatus: req.query.verificationStatus as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await paymentWebhookService.getAllPaymentWebhooks(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment webhooks fetched successfully",
    data: result,
  });
});

const getPaymentWebhookById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentWebhookService.getPaymentWebhookById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment webhook fetched successfully",
    data: result,
  });
});

const updateWebhookVerificationStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentWebhookService.updateWebhookVerificationStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment webhook verification status updated successfully",
    data: result,
  });
});

const deletePaymentWebhook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentWebhookService.deletePaymentWebhook(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment webhook deleted successfully",
    data: result,
  });
});

export const paymentWebhookController = {
  recordPaymentWebhook,
  getWebhooksByPaymentId,
  getAllPaymentWebhooks,
  getPaymentWebhookById,
  updateWebhookVerificationStatus,
  deletePaymentWebhook,
};
