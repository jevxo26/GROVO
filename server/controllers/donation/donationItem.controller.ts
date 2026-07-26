import status from "http-status";
import { donationItemService } from "../../services/donation/donationItem.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDonationItem = catchAsync(async (req, res) => {
  const result = await donationItemService.createDonationItem(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation item created successfully",
    data: result,
  });
});

const getDonationItemsByDonationId = catchAsync(async (req, res) => {
  const { donationId } = req.params;
  const result = await donationItemService.getDonationItemsByDonationId(donationId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation items fetched successfully",
    data: result,
  });
});

const getDonationItemsByFundId = catchAsync(async (req, res) => {
  const { fundId } = req.params;
  const query = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await donationItemService.getDonationItemsByFundId(fundId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Fund donation items fetched successfully",
    data: result,
  });
});

const getDonationItemById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationItemService.getDonationItemById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation item fetched successfully",
    data: result,
  });
});

const updateDonationItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationItemService.updateDonationItem(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation item updated successfully",
    data: result,
  });
});

const deleteDonationItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationItemService.deleteDonationItem(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation item deleted successfully",
    data: result,
  });
});

export const donationItemController = {
  createDonationItem,
  getDonationItemsByDonationId,
  getDonationItemsByFundId,
  getDonationItemById,
  updateDonationItem,
  deleteDonationItem,
};
