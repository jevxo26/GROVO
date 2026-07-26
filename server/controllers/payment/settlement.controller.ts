import status from "http-status";
import { SettlementStatus } from "../../../generated/prisma/enums";
import { settlementService } from "../../services/payment/settlement.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createSettlement = catchAsync(async (req, res) => {
  const result = await settlementService.createSettlement(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Settlement record created successfully",
    data: result,
  });
});

const getSettlementsByGatewayId = catchAsync(async (req, res) => {
  const { paymentGatewayId } = req.params;
  const result = await settlementService.getSettlementsByGatewayId(paymentGatewayId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Gateway settlements fetched successfully",
    data: result,
  });
});

const getAllSettlements = catchAsync(async (req, res) => {
  const query = {
    paymentGatewayId: req.query.paymentGatewayId as string | undefined,
    status: req.query.status as SettlementStatus | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await settlementService.getAllSettlements(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Settlements fetched successfully",
    data: result,
  });
});

const getSettlementById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await settlementService.getSettlementById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Settlement fetched successfully",
    data: result,
  });
});

const updateSettlementStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await settlementService.updateSettlementStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Settlement status updated successfully",
    data: result,
  });
});

const deleteSettlement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await settlementService.deleteSettlement(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Settlement deleted successfully",
    data: result,
  });
});

export const settlementController = {
  createSettlement,
  getSettlementsByGatewayId,
  getAllSettlements,
  getSettlementById,
  updateSettlementStatus,
  deleteSettlement,
};
