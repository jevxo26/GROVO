import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 17. ACKNOWLEDGEMENT CONTROLLERS ====================
export const createAcknowledgement = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createAcknowledgement(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Acknowledgement created successfully",
    data: result,
  });
});

export const getAllAcknowledgements = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllAcknowledgements(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgements retrieved successfully",
    data: result,
  });
});

export const getAcknowledgementById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getAcknowledgementById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgement retrieved successfully",
    data: result,
  });
});

export const updateAcknowledgement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateAcknowledgement(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgement updated successfully",
    data: result,
  });
});

export const deleteAcknowledgement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteAcknowledgement(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgement deleted successfully",
    data: result,
  });
});
