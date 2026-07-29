import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 5. DONOR SUBSCRIPTION CONTROLLERS ====================
export const createDonorSubscription = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorSubscription(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor subscription created successfully",
    data: result,
  });
});

export const getAllDonorSubscriptions = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonorSubscriptions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscriptions retrieved successfully",
    data: result,
  });
});

export const getDonorSubscriptionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonorSubscriptionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscription retrieved successfully",
    data: result,
  });
});

export const updateDonorSubscription = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonorSubscription(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscription updated successfully",
    data: result,
  });
});

export const deleteDonorSubscription = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonorSubscription(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscription deleted successfully",
    data: result,
  });
});
