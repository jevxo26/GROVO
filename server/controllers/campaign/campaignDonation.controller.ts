import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { campaignDonationService } from "../../services/campaign/campaignDonation.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const recordDonation = catchAsync(async (req, res) => {
  const donorId = req.user?.userId;
  const result = await campaignDonationService.recordDonation(donorId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation recorded successfully",
    data: result,
  });
});

const getDonationsByCampaignId = catchAsync(async (req, res) => {
  const { campaignId } = req.params;
  const query = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    paymentStatus: req.query.paymentStatus as PaymentStatus | undefined,
  };

  const result = await campaignDonationService.getDonationsByCampaignId(campaignId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign donations fetched successfully",
    data: result,
  });
});

const getDonationsByDonorId = catchAsync(async (req, res) => {
  const donorId = (req.params.donorId as string) || req.user?.userId;
  const query = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await campaignDonationService.getDonationsByDonorId(donorId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor donations fetched successfully",
    data: result,
  });
});

const getDonationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignDonationService.getDonationById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation fetched successfully",
    data: result,
  });
});

const updateDonationPaymentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await campaignDonationService.updateDonationPaymentStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation payment status updated successfully",
    data: result,
  });
});

export const campaignDonationController = {
  recordDonation,
  getDonationsByCampaignId,
  getDonationsByDonorId,
  getDonationById,
  updateDonationPaymentStatus,
};
