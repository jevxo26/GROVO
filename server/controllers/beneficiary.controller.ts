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
    statusCode: httpStatus.CREATED,
    message: "Beneficiary registered successfully",
    data: result,
  });
});

const logNeedAssessment = catchAsync(async (req, res) => {
  const { beneficiaryId, type, priority, officerId, requiredSupport } = req.body;

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
    requiredSupport,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Need assessment recorded successfully",
    data: result,
  });
});

const verifyDistribution = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  const result = await beneficiaryService.verifyDistribution(id, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Distribution verified successfully",
    data: result,
  });
});

const acknowledgeDistribution = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const { signature, photo, remarks } = req.body;

  const result = await beneficiaryService.acknowledgeDistribution(id, { signature, photo, remarks });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Distribution acknowledged successfully",
    data: result,
  });
});

const createReliefPackage = catchAsync(async (req, res) => {
  const { packageName, description, estimatedValue } = req.body;

  if (!packageName || estimatedValue === undefined) {
    throw new customError(httpStatus.BAD_REQUEST, "packageName and estimatedValue are required.");
  }

  const result = await beneficiaryService.createReliefPackage({
    packageName,
    description,
    estimatedValue: Number(estimatedValue),
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Relief package created successfully",
    data: result,
  });
});

const createDistributionCampaign = catchAsync(async (req, res) => {
  const { campaignId, title, distributionDate, location } = req.body;

  if (!campaignId || !title || !distributionDate) {
    throw new customError(httpStatus.BAD_REQUEST, "campaignId, title, and distributionDate are required.");
  }

  const result = await beneficiaryService.createDistributionCampaign({
    campaignId,
    title,
    distributionDate,
    location,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Distribution campaign created successfully",
    data: result,
  });
});

const createFollowUpVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const { remarks, nextVisitDate } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  const result = await beneficiaryService.createFollowUpVisit(id, {
    visitedBy: adminId,
    remarks,
    nextVisitDate,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Follow up visit recorded successfully",
    data: result,
  });
});

const getBeneficiaryDetail = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryService.getBeneficiaryDetail(id);

  if (!result) {
    throw new customError(httpStatus.NOT_FOUND, "Beneficiary not found.");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Beneficiary details retrieved successfully",
    data: result,
  });
});

export const beneficiaryController = {
  registerBeneficiary,
  logNeedAssessment,
  verifyDistribution,
  acknowledgeDistribution,
  createReliefPackage,
  createDistributionCampaign,
  createFollowUpVisit,
  getBeneficiaryDetail,
};
