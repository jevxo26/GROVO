import httpStatus from "http-status";
import customError from "../error/customError";
import { donationService } from "../services/donation.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const processDonation = catchAsync(async (req, res) => {
  const { donorId, amount, campaignId, projectId, paymentMethod, transactionId, currency, isAnonymous, message } = req.body;

  if (!donorId || !amount || !paymentMethod || !transactionId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required parameters.",
    );
  }

  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  const result = await donationService.processDonation({
    donorId,
    amount: parsedAmount,
    campaignId,
    projectId,
    paymentMethod,
    transactionId,
    currency,
    isAnonymous,
    message,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Donation processed successfully",
    data: result,
  });
});

const handlePaymentWebhook = catchAsync(async (req, res) => {
  const gateway = req.params.gateway as string;
  const result = await donationService.handlePaymentWebhook(gateway, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Webhook processed successfully",
    data: result,
  });
});

const getMyDonations = catchAsync(async (req, res) => {
  const donorId = req.headers["x-donor-id"] as string || "donor-mock";
  const result = await donationService.getMyDonations(donorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Donations retrieved successfully",
    data: result,
  });
});

const getReceipt = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donationService.getReceipt(id);

  if (!result) {
    throw new customError(httpStatus.NOT_FOUND, "Receipt not found.");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Receipt retrieved successfully",
    data: result,
  });
});

const requestRefund = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const { reason } = req.body;

  const result = await donationService.requestRefund(id, { reason });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Refund request submitted successfully",
    data: result,
  });
});

const getPaymentGateways = catchAsync(async (req, res) => {
  const result = await donationService.getPaymentGateways();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Payment gateways retrieved successfully",
    data: result,
  });
});

const createSettlement = catchAsync(async (req, res) => {
  const { gatewayId, totalCollected, processingFee } = req.body;

  if (!gatewayId || totalCollected === undefined) {
    throw new customError(httpStatus.BAD_REQUEST, "gatewayId and totalCollected are required.");
  }

  const result = await donationService.createSettlement({
    gatewayId,
    totalCollected: Number(totalCollected),
    processingFee: processingFee ? Number(processingFee) : 0,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Settlement created successfully",
    data: result,
  });
});

export const donationController = {
  processDonation,
  handlePaymentWebhook,
  getMyDonations,
  getReceipt,
  requestRefund,
  getPaymentGateways,
  createSettlement,
};
