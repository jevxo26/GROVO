import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 21. BENEFICIARY ACTIVITY LOG CONTROLLERS ====================
export const createBeneficiaryActivityLog = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createBeneficiaryActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary activity log created successfully",
    data: result,
  });
});

export const getAllBeneficiaryActivityLogs = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllBeneficiaryActivityLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary activity logs retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryActivityLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getBeneficiaryActivityLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary activity log retrieved successfully",
    data: result,
  });
});

export const deleteBeneficiaryActivityLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteBeneficiaryActivityLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary activity log deleted successfully",
    data: result,
  });
});
