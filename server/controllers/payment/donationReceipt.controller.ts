import status from "http-status";
import { donationReceiptService } from "../../services/payment/donationReceipt.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const generateDonationReceipt = catchAsync(async (req, res) => {
  const result = await donationReceiptService.generateDonationReceipt(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation receipt generated successfully",
    data: result,
  });
});

const getDonationReceiptByDonationId = catchAsync(async (req, res) => {
  const { donationId } = req.params;
  const result = await donationReceiptService.getDonationReceiptByDonationId(donationId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation receipt fetched successfully",
    data: result,
  });
});

const getDonationReceiptByNumber = catchAsync(async (req, res) => {
  const { receiptNumber } = req.params;
  const result = await donationReceiptService.getDonationReceiptByNumber(receiptNumber as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation receipt fetched successfully",
    data: result,
  });
});

const getDonationReceiptById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationReceiptService.getDonationReceiptById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation receipt fetched successfully",
    data: result,
  });
});

const deleteDonationReceipt = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationReceiptService.deleteDonationReceipt(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation receipt deleted successfully",
    data: result,
  });
});

export const donationReceiptController = {
  generateDonationReceipt,
  getDonationReceiptByDonationId,
  getDonationReceiptByNumber,
  getDonationReceiptById,
  deleteDonationReceipt,
};
