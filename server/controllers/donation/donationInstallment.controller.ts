import status from "http-status";
import { donationInstallmentService } from "../../services/donation/donationInstallment.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const generateInstallment = catchAsync(async (req, res) => {
  const result = await donationInstallmentService.generateInstallment(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation installment generated successfully",
    data: result,
  });
});

const getInstallmentsByScheduleId = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;
  const result = await donationInstallmentService.getInstallmentsByScheduleId(scheduleId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation schedule installments fetched successfully",
    data: result,
  });
});

const getDonationInstallmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationInstallmentService.getDonationInstallmentById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation installment fetched successfully",
    data: result,
  });
});

const updateInstallmentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationInstallmentService.updateInstallmentStatus(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation installment payment status updated successfully",
    data: result,
  });
});

const deleteDonationInstallment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await donationInstallmentService.deleteDonationInstallment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation installment deleted successfully",
    data: result,
  });
});

export const donationInstallmentController = {
  generateInstallment,
  getInstallmentsByScheduleId,
  getDonationInstallmentById,
  updateInstallmentStatus,
  deleteDonationInstallment,
};
