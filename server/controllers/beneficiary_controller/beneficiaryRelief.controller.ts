import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { beneficiaryReliefService } from "../../services/beneficiary_service/beneficiaryRelief.service";

const createReliefPackage = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createReliefPackage(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Relief package created successfully",
    data: result,
  });
});

const createReliefItem = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createReliefItem(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Relief item added successfully",
    data: result,
  });
});

const createDistributionCampaign = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionCampaign(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution campaign created successfully",
    data: result,
  });
});

const createDistributionSchedule = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionSchedule(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution schedule created successfully",
    data: result,
  });
});

const createDistributionCenter = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionCenter(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution center registered successfully",
    data: result,
  });
});

const createBeneficiaryQRCode = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createBeneficiaryQRCode(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary QR Code generated successfully",
    data: result,
  });
});

export const beneficiaryReliefController = {
  createReliefPackage,
  createReliefItem,
  createDistributionCampaign,
  createDistributionSchedule,
  createDistributionCenter,
  createBeneficiaryQRCode,
};
