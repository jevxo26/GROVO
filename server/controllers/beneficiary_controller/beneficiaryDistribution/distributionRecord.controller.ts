import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 13. DISTRIBUTION RECORD CONTROLLERS ====================
export const createDistributionRecord = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionRecord(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution record created successfully",
    data: result,
  });
});

export const getAllDistributionRecords = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllDistributionRecords(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution records retrieved successfully",
    data: result,
  });
});

export const getDistributionRecordById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getDistributionRecordById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution record retrieved successfully",
    data: result,
  });
});

export const updateDistributionRecord = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateDistributionRecord(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution record updated successfully",
    data: result,
  });
});

export const deleteDistributionRecord = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteDistributionRecord(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution record deleted successfully",
    data: result,
  });
});
