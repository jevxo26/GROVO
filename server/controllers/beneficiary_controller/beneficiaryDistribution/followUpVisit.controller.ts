import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 19. FOLLOW UP VISIT CONTROLLERS ====================
export const createFollowUpVisit = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createFollowUpVisit(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Follow-up visit created successfully",
    data: result,
  });
});

export const getAllFollowUpVisits = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllFollowUpVisits(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visits retrieved successfully",
    data: result,
  });
});

export const getFollowUpVisitById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getFollowUpVisitById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visit retrieved successfully",
    data: result,
  });
});

export const updateFollowUpVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateFollowUpVisit(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visit updated successfully",
    data: result,
  });
});

export const deleteFollowUpVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteFollowUpVisit(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visit deleted successfully",
    data: result,
  });
});
