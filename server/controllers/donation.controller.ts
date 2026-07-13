import httpStatus from "http-status";
import customError from "../error/customError";
import { donationService } from "../services/donation.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const processDonation = catchAsync(async (req, res) => {
  const { donorId, amount, campaignId, paymentMethod, transactionId } = req.body;

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
    paymentMethod,
    transactionId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Donation processed successfully",
    data: result,
  });
});

export const donationController = {
  processDonation,
};
