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

const generateFinancialReport = catchAsync(async (req, res) => {
  const { report_type, start_date, end_date } = req.body;

  if (!report_type || !start_date || !end_date) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "report_type, start_date, and end_date are required.",
    );
  }

  const result = await financialService.generateFinancialReport({
    reportType: report_type,
    startDate: start_date,
    endDate: end_date,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Financial report generated successfully",
    data: result,
  });
});

export const financialController = {
  transferCapital,
  verifyTransaction,
  generateFinancialReport,
};
