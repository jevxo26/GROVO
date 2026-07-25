import status from "http-status";
import { donationCategoryService } from "../../services/donation/donationCategory.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDonationCategory = catchAsync(async (req, res) => {
  const result = await donationCategoryService.createDonationCategory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation category created successfully",
    data: result,
  });
});

const getAllDonationCategories = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await donationCategoryService.getAllDonationCategories(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation categories fetched successfully",
    data: result,
  });
});

const getDonationCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationCategoryService.getDonationCategoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation category fetched successfully",
    data: result,
  });
});

const updateDonationCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationCategoryService.updateDonationCategory(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation category updated successfully",
    data: result,
  });
});

const deleteDonationCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationCategoryService.deleteDonationCategory(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation category deleted successfully",
    data: result,
  });
});

export const donationCategoryController = {
  createDonationCategory,
  getAllDonationCategories,
  getDonationCategoryById,
  updateDonationCategory,
  deleteDonationCategory,
};
