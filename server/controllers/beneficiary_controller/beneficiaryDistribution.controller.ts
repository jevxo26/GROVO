import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { beneficiaryDistributionService } from "../../services/beneficiary_service/beneficiaryDistribution.service";

const createDistributionRecord = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionRecord(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution record logged successfully",
    data: result,
  });
});

const createDistributionItem = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionItem(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution item added successfully",
    data: result,
  });
});

const createDistributionVerification = catchAsync(async (req, res) => {
  const result =
    await beneficiaryDistributionService.createDistributionVerification(
      req.body,
    );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution verification logged successfully",
    data: result,
  });
});

const createAcknowledgement = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createAcknowledgement(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Acknowledgement submitted successfully",
    data: result,
  });
});

const createBeneficiaryFeedback = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createBeneficiaryFeedback(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary feedback recorded successfully",
    data: result,
  });
});

const createFollowUpVisit = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createFollowUpVisit(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Follow-up visit recorded successfully",
    data: result,
  });
});

const createCaseHistory = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createCaseHistory(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Case history logged successfully",
    data: result,
  });
});

const createBeneficiaryActivityLog = catchAsync(async (req, res) => {
  const result =
    await beneficiaryDistributionService.createBeneficiaryActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary activity logged successfully",
    data: result,
  });
});

export const beneficiaryDistributionController = {
  createDistributionRecord,
  createDistributionItem,
  createDistributionVerification,
  createAcknowledgement,
  createBeneficiaryFeedback,
  createFollowUpVisit,
  createCaseHistory,
  createBeneficiaryActivityLog,
};
