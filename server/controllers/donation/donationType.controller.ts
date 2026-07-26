import status from "http-status";
import { donationTypeService } from "../../services/donation/donationType.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDonationType = catchAsync(async (req, res) => {
  const result = await donationTypeService.createDonationType(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation type created successfully",
    data: result,
  });
});

const getAllDonationTypes = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await donationTypeService.getAllDonationTypes(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation types fetched successfully",
    data: result,
  });
});

const getDonationTypeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationTypeService.getDonationTypeById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation type fetched successfully",
    data: result,
  });
});

const updateDonationType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationTypeService.updateDonationType(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation type updated successfully",
    data: result,
  });
});

const deleteDonationType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationTypeService.deleteDonationType(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation type deleted successfully",
    data: result,
  });
});

export const donationTypeController = {
  createDonationType,
  getAllDonationTypes,
  getDonationTypeById,
  updateDonationType,
  deleteDonationType,
};
