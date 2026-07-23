import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { donorCoreService } from "../../services/donor_service/donorCore.service";
import { sendResponse } from "../../utils/sendResponse";

const createDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createDonor(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor created successfully",
    data: result,
  });
});

const getAllDonors = catchAsync(async (_req, res) => {
  const result = await donorCoreService.getAllDonors();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donors retrieved successfully",
    data: result,
  });
});

const createIndividualDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createIndividualDonor(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Individual donor profile created successfully",
    data: result,
  });
});

const createCorporateDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createCorporateDonor(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Corporate donor profile created successfully",
    data: result,
  });
});

const createDonorOrganization = catchAsync(async (req, res) => {
  const result = await donorCoreService.createDonorOrganization(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor organization details added successfully",
    data: result,
  });
});

export const donorCoreController = {
  createDonor,
  getAllDonors,
  createIndividualDonor,
  createCorporateDonor,
  createDonorOrganization,
};
