import status from "http-status";
import { beneficiaryReliefService } from "../../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 11. DISTRIBUTION SCHEDULE CONTROLLERS ====================
export const createDistributionSchedule = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution schedule created successfully",
    data: result,
  });
});

export const getAllDistributionSchedules = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllDistributionSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedules retrieved successfully",
    data: result,
  });
});

export const getDistributionScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getDistributionScheduleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedule retrieved successfully",
    data: result,
  });
});

export const updateDistributionSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateDistributionSchedule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedule updated successfully",
    data: result,
  });
});

export const deleteDistributionSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteDistributionSchedule(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedule deleted successfully",
    data: result,
  });
});
