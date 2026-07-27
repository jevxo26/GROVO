import status from "http-status";
import { branchMeetingService } from "../../services/organization/branchMeeting.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchMeeting = catchAsync(async (req, res) => {
  const result = await branchMeetingService.createBranchMeeting(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Meeting created successfully",
    data: result,
  });
});

const getAllBranchMeetings = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchMeetingService.getAllBranchMeetings(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Meetings fetched successfully",
    data: result,
  });
});

const getBranchMeetingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchMeetingService.getBranchMeetingById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Meeting fetched successfully",
    data: result,
  });
});

const updateBranchMeeting = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchMeetingService.updateBranchMeeting(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Meeting updated successfully",
    data: result,
  });
});

const deleteBranchMeeting = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchMeetingService.deleteBranchMeeting(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Meeting deleted successfully",
    data: result,
  });
});

export const branchMeetingController = {
  createBranchMeeting,
  getAllBranchMeetings,
  getBranchMeetingById,
  updateBranchMeeting,
  deleteBranchMeeting,
};
