import status from "http-status";
import { branchAnnouncementService } from "../../services/organization/branchAnnouncement.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchAnnouncement = catchAsync(async (req, res) => {
  const result = await branchAnnouncementService.createBranchAnnouncement(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Announcement created successfully",
    data: result,
  });
});

const getAllBranchAnnouncements = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchAnnouncementService.getAllBranchAnnouncements(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Announcements fetched successfully",
    data: result,
  });
});

const getBranchAnnouncementById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchAnnouncementService.getBranchAnnouncementById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Announcement fetched successfully",
    data: result,
  });
});

const updateBranchAnnouncement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchAnnouncementService.updateBranchAnnouncement(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Announcement updated successfully",
    data: result,
  });
});

const deleteBranchAnnouncement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchAnnouncementService.deleteBranchAnnouncement(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Announcement deleted successfully",
    data: result,
  });
});

export const branchAnnouncementController = {
  createBranchAnnouncement,
  getAllBranchAnnouncements,
  getBranchAnnouncementById,
  updateBranchAnnouncement,
  deleteBranchAnnouncement,
};
