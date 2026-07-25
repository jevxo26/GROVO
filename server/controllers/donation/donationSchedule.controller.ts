import status from "http-status";
import { ScheduleFrequency } from "../../../generated/prisma/enums";
import { donationScheduleService } from "../../services/donation/donationSchedule.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDonationSchedule = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await donationScheduleService.createDonationSchedule(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation schedule created successfully",
    data: result,
  });
});

const getDonationSchedulesByDonorId = catchAsync(async (req, res) => {
  const donorId = (req.params.donorId as string) || req.user?.userId;
  const result = await donationScheduleService.getDonationSchedulesByDonorId(donorId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor donation schedules fetched successfully",
    data: result,
  });
});

const getAllDonationSchedules = catchAsync(async (req, res) => {
  const query = {
    frequency: req.query.frequency as ScheduleFrequency | undefined,
    status: req.query.status as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await donationScheduleService.getAllDonationSchedules(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation schedules fetched successfully",
    data: result,
  });
});

const getDonationScheduleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationScheduleService.getDonationScheduleById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation schedule fetched successfully",
    data: result,
  });
});

const updateDonationSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationScheduleService.updateDonationSchedule(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation schedule updated successfully",
    data: result,
  });
});

const deleteDonationSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationScheduleService.deleteDonationSchedule(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation schedule deleted successfully",
    data: result,
  });
});

export const donationScheduleController = {
  createDonationSchedule,
  getDonationSchedulesByDonorId,
  getAllDonationSchedules,
  getDonationScheduleById,
  updateDonationSchedule,
  deleteDonationSchedule,
};
