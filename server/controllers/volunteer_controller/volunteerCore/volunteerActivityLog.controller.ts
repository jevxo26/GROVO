import status from "http-status";
import { volunteerCoreService } from "../../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 21. VOLUNTEER ACTIVITY LOG CONTROLLERS ====================
export const createVolunteerActivityLog = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer activity log created successfully",
    data: result,
  });
});

export const getAllVolunteerActivityLogs = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerActivityLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer activity logs retrieved successfully",
    data: result,
  });
});

export const getVolunteerActivityLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerActivityLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer activity log retrieved successfully",
    data: result,
  });
});

export const deleteVolunteerActivityLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerActivityLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer activity log deleted successfully",
    data: result,
  });
});
