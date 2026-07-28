import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 18. VOLUNTEER ANNOUNCEMENT CONTROLLERS ====================
export const createVolunteerAnnouncement = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerAnnouncement(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer announcement created successfully",
    data: result,
  });
});

export const getAllVolunteerAnnouncements = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerAnnouncements(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcements retrieved successfully",
    data: result,
  });
});

export const getVolunteerAnnouncementById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerAnnouncementById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcement retrieved successfully",
    data: result,
  });
});

export const updateVolunteerAnnouncement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerAnnouncement(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcement updated successfully",
    data: result,
  });
});

export const deleteVolunteerAnnouncement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerAnnouncement(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcement deleted successfully",
    data: result,
  });
});
