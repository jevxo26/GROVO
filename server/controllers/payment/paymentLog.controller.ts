import status from "http-status";
import { paymentLogService } from "../../services/payment/paymentLog.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const recordPaymentLog = catchAsync(async (req, res) => {
  const ipAddress = (req.headers["x-forwarded-for"] as string) || req.ip;
  const result = await paymentLogService.recordPaymentLog({
    ...req.body,
    ipAddress: req.body.ipAddress || ipAddress,
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Payment log recorded successfully",
    data: result,
  });
});

const getPaymentLogsByPaymentId = catchAsync(async (req, res) => {
  const { paymentId } = req.params;
  const result = await paymentLogService.getPaymentLogsByPaymentId(paymentId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment logs fetched successfully",
    data: result,
  });
});

const getAllPaymentLogs = catchAsync(async (req, res) => {
  const query = {
    event: req.query.event as string | undefined,
    status: req.query.status as string | undefined,
    ipAddress: req.query.ipAddress as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await paymentLogService.getAllPaymentLogs(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment logs fetched successfully",
    data: result,
  });
});

const getPaymentLogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentLogService.getPaymentLogById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment log fetched successfully",
    data: result,
  });
});

const deletePaymentLog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentLogService.deletePaymentLog(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment log deleted successfully",
    data: result,
  });
});

export const paymentLogController = {
  recordPaymentLog,
  getPaymentLogsByPaymentId,
  getAllPaymentLogs,
  getPaymentLogById,
  deletePaymentLog,
};
