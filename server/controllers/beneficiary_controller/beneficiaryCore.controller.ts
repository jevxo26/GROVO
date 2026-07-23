import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { beneficiaryCoreService } from "../../services/beneficiary_service/beneficiaryCore.service";

const createBeneficiary = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiary(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary registered successfully",
    data: result,
  });
});

const getAllBeneficiaries = catchAsync(async (_req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaries();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiaries retrieved successfully",
    data: result,
  });
});

const createBeneficiaryProfile = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryProfile(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary profile created successfully",
    data: result,
  });
});

const createFamilyMember = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createFamilyMember(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Family member added successfully",
    data: result,
  });
});

const createBeneficiaryCategory = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryCategory(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary category created successfully",
    data: result,
  });
});

const createBeneficiaryDocument = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryDocument(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary document uploaded successfully",
    data: result,
  });
});

const createBeneficiaryVerification = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryVerification(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary verification logged successfully",
    data: result,
  });
});

const createBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryNeedAssessment(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Need assessment created successfully",
    data: result,
  });
});

export const beneficiaryCoreController = {
  createBeneficiary,
  getAllBeneficiaries,
  createBeneficiaryProfile,
  createFamilyMember,
  createBeneficiaryCategory,
  createBeneficiaryDocument,
  createBeneficiaryVerification,
  createBeneficiaryNeedAssessment,
};
