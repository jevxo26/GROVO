import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { masterDonationService } from "../../services/donation/donation.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDonation = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await masterDonationService.createDonation(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation record created successfully",
    data: result,
  });
});

const getAllDonations = catchAsync(async (req, res) => {
  const query = {
    donorId: req.query.donorId as string | undefined,
    campaignId: req.query.campaignId as string | undefined,
    projectId: req.query.projectId as string | undefined,
    categoryId: req.query.categoryId as string | undefined,
    donationTypeId: req.query.donationTypeId as string | undefined,
    paymentStatus: req.query.paymentStatus as PaymentStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await masterDonationService.getAllDonations(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donations fetched successfully",
    data: result,
  });
});

const getDonationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await masterDonationService.getDonationById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation fetched successfully",
    data: result,
  });
});

const getDonationByNumber = catchAsync(async (req, res) => {
  const { number } = req.params;
  const result = await masterDonationService.getDonationByNumber(number as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation fetched successfully",
    data: result,
  });
});

const updateDonation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await masterDonationService.updateDonation(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation updated successfully",
    data: result,
  });
});

const deleteDonation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await masterDonationService.deleteDonation(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation deleted successfully",
    data: result,
  });
});

const getDonationStats = catchAsync(async (req, res) => {
  const result = await masterDonationService.getDonationStats();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation statistics fetched successfully",
    data: result,
  });
});

export const masterDonationController = {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationByNumber,
  updateDonation,
  deleteDonation,
  getDonationStats,
};
