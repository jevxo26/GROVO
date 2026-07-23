import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { donorFinanceService } from "../../services/donor_service/donorFinance.service";
import { sendResponse } from "../../utils/sendResponse";

const createDonorSubscription = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorSubscription(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor subscription initialized successfully",
    data: result,
  });
});

const createDonationCommitment = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonationCommitment(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation commitment recorded successfully",
    data: result,
  });
});

const createDonorWallet = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorWallet(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor wallet created successfully",
    data: result,
  });
});

const createDonorTransaction = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorTransaction(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor transaction logged successfully",
    data: result,
  });
});

const createMembershipFee = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipFee(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership fee configured successfully",
    data: result,
  });
});

const createMembershipPayment = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipPayment(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership payment recorded successfully",
    data: result,
  });
});

const createMembershipHistory = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipHistory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership history recorded successfully",
    data: result,
  });
});

export const donorFinanceController = {
  createDonorSubscription,
  createDonationCommitment,
  createDonorWallet,
  createDonorTransaction,
  createMembershipFee,
  createMembershipPayment,
  createMembershipHistory,
};
