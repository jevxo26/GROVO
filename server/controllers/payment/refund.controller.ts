import status from "http-status";
import { RefundStatus } from "../../../generated/prisma/enums";
import { refundService } from "../../services/payment/refund.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createRefundRequest = catchAsync(async (req, res) => {
  const result = await refundService.createRefundRequest(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Refund request submitted successfully",
    data: result,
  });
});

const getRefundsByPaymentId = catchAsync(async (req, res) => {
  const { paymentId } = req.params;
  const result = await refundService.getRefundsByPaymentId(paymentId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment refunds fetched successfully",
    data: result,
  });
});

const getAllRefunds = catchAsync(async (req, res) => {
  const query = {
    refundStatus: req.query.refundStatus as RefundStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await refundService.getAllRefunds(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Refunds fetched successfully",
    data: result,
  });
});

const getRefundById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await refundService.getRefundById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Refund fetched successfully",
    data: result,
  });
});

const updateRefundStatus = catchAsync(async (req, res) => {
  const processorUserId = req.user?.userId;
  const { id } = req.params;
  const result = await refundService.updateRefundStatus(processorUserId, id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Refund status updated successfully",
    data: result,
  });
});

const deleteRefund = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await refundService.deleteRefund(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Refund deleted successfully",
    data: result,
  });
});

export const refundController = {
  createRefundRequest,
  getRefundsByPaymentId,
  getAllRefunds,
  getRefundById,
  updateRefundStatus,
  deleteRefund,
};
