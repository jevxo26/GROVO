import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 15. VOLUNTEER CERTIFICATE CONTROLLERS ====================
export const createVolunteerCertificate = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerCertificate(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer certificate created successfully",
    data: result,
  });
});

export const getAllVolunteerCertificates = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerCertificates(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificates retrieved successfully",
    data: result,
  });
});

export const getVolunteerCertificateById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerCertificateById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificate retrieved successfully",
    data: result,
  });
});

export const updateVolunteerCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerCertificate(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificate updated successfully",
    data: result,
  });
});

export const deleteVolunteerCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerCertificate(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificate deleted successfully",
    data: result,
  });
});
