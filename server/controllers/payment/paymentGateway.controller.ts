import status from "http-status";
import { GatewayEnvironment } from "../../../generated/prisma/enums";
import { paymentGatewayService } from "../../services/payment/paymentGateway.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createPaymentGateway = catchAsync(async (req, res) => {
  const result = await paymentGatewayService.createPaymentGateway(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Payment gateway created successfully",
    data: result,
  });
});

const getAllPaymentGateways = catchAsync(async (req, res) => {
  const query = {
    environment: req.query.environment as GatewayEnvironment | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await paymentGatewayService.getAllPaymentGateways(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment gateways fetched successfully",
    data: result,
  });
});

const getPaymentGatewayById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentGatewayService.getPaymentGatewayById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment gateway fetched successfully",
    data: result,
  });
});

const updatePaymentGateway = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentGatewayService.updatePaymentGateway(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment gateway updated successfully",
    data: result,
  });
});

const deletePaymentGateway = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentGatewayService.deletePaymentGateway(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Payment gateway deleted successfully",
    data: result,
  });
});

export const paymentGatewayController = {
  createPaymentGateway,
  getAllPaymentGateways,
  getPaymentGatewayById,
  updatePaymentGateway,
  deletePaymentGateway,
};
