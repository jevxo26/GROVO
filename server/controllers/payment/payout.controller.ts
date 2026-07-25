import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { payoutService } from "../../services/payment/payout.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createPayout = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await payoutService.createPayout(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Payout recorded successfully",
    data: result,
  });
});

const getPayoutsByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await payoutService.getPayoutsByProjectId(projectId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project payouts fetched successfully",
    data: result,
  });
});

const getAllPayouts = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    projectId: req.query.projectId as string | undefined,
    paymentStatus: req.query.paymentStatus as PaymentStatus | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await payoutService.getAllPayouts(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payouts fetched successfully",
    data: result,
  });
});

const getPayoutById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await payoutService.getPayoutById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payout fetched successfully",
    data: result,
  });
});

const updatePayoutStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await payoutService.updatePayoutStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payout status updated successfully",
    data: result,
  });
});

const deletePayout = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await payoutService.deletePayout(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payout deleted successfully",
    data: result,
  });
});

export const payoutController = {
  createPayout,
  getPayoutsByProjectId,
  getAllPayouts,
  getPayoutById,
  updatePayoutStatus,
  deletePayout,
};
