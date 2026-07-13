import httpStatus from "http-status";
import customError from "../error/customError";
import { financialService } from "../services/financial.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const transferCapital = catchAsync(async (req, res) => {
  const { fromFundId, toFundId, amount, reason, approvedBy } = req.body;

  if (!fromFundId || !toFundId || amount <= 0) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Invalid transfer boundaries.",
    );
  }

  const result = await financialService.transferCapital({
    fromFundId,
    toFundId,
    amount,
    reason,
    approvedBy,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Capital transferred successfully",
    data: result,
  });
});

const verifyTransaction = catchAsync(async (req, res) => {
  const { paymentId, gatewayTxId, status, amount } = req.body;

  if (!paymentId || !gatewayTxId || !status || amount === undefined) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required transaction verification parameters.",
    );
  }

  const result = await financialService.verifyTransaction({
    paymentId,
    gatewayTxId,
    status,
    amount,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Payment transaction verified successfully",
    data: result,
  });
});

export const financialController = {
  transferCapital,
  verifyTransaction,
};
