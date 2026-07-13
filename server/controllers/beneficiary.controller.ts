import httpStatus from "http-status";
import customError from "../error/customError";
import { beneficiaryService } from "../services/beneficiary.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerBeneficiary = catchAsync(async (req, res) => {
  const { fullName, phone, nationalId, branchId, occupation, monthlyIncome } = req.body;

  if (!fullName || !branchId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Full name and branch mapping required.",
    );
  }

  const result = await beneficiaryService.registerBeneficiary({
    fullName,
    phone,
    nationalId,
    branchId,
    occupation,
    monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome.toString()) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Beneficiary registered successfully",
    data: result,
  });
});

const logNeedAssessment = catchAsync(async (req, res) => {
  const { beneficiaryId, type, priority, officerId } = req.body;

  if (!beneficiaryId || !type || !priority || !officerId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing need assessment fields.",
    );
  }

  const result = await beneficiaryService.logNeedAssessment({
    beneficiaryId,
    assessmentType: type,
    priority,
    assessedBy: officerId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Need assessment recorded successfully",
    data: result,
  });
});

export const beneficiaryController = {
  registerBeneficiary,
  logNeedAssessment,
};
