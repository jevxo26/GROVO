import httpStatus from "http-status";
import customError from "../error/customError";
import { volunteerService } from "../services/volunteer.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerPerformance = catchAsync(async (req, res) => {
  const {
    volunteerId,
    totalAssignments,
    completedAssignments,
    attendanceRate,
    score,
  } = req.body;

  if (!volunteerId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Volunteer target ID required.",
    );
  }

  const result = await volunteerService.registerPerformance({
    volunteerId,
    totalAssignments: totalAssignments ? Number(totalAssignments) : 0,
    completedAssignments: completedAssignments ? Number(completedAssignments) : 0,
    attendanceRate: attendanceRate ? Number(attendanceRate) : 100,
    score: score ? Number(score) : 0,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Volunteer performance registered successfully",
    data: result,
  });
});

const getAvailableVolunteers = catchAsync(async (req, res) => {
  const result = await volunteerService.getAvailableVolunteers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Available volunteers retrieved successfully",
    data: result,
  });
});

const registerVolunteer = catchAsync(async (req, res) => {
  const { user_id, branch_id, profession, organization, skills, languages, emergency_contact, blood_group, experience } = req.body;
  const userId = user_id || req.headers["x-user-id"];

  if (!userId || !branch_id) {
    throw new customError(httpStatus.BAD_REQUEST, "userId and branchId are required.");
  }

  const result = await volunteerService.registerVolunteer({
    userId: String(userId),
    branchId: branch_id,
    profession,
    organization,
    skills,
    languages,
    emergencyContact: emergency_contact,
    bloodGroup: blood_group,
    experience,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Volunteer profile registered successfully",
    data: result,
  });
});

const assignVolunteer = catchAsync(async (req, res) => {
  const { volunteer_id, campaign_id, project_id, assigned_role } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!volunteer_id) {
    throw new customError(httpStatus.BAD_REQUEST, "volunteer_id is required.");
  }

  const result = await volunteerService.assignVolunteer({
    volunteerId: volunteer_id,
    campaignId: campaign_id,
    projectId: project_id,
    assignedBy: adminId,
    assignedRole: assigned_role,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Volunteer assigned successfully",
    data: result,
  });
});

const getPerformance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerService.getPerformance(id);

  if (!result) {
    throw new customError(httpStatus.NOT_FOUND, "Performance record not found.");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Volunteer performance retrieved successfully",
    data: result,
  });
});

const listVolunteers = catchAsync(async (req, res) => {
  const { status, page, limit } = req.query;

  const result = await volunteerService.listVolunteers({
    status: status as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Volunteers retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const volunteerController = {
  registerPerformance,
  getAvailableVolunteers,
  registerVolunteer,
  assignVolunteer,
  getPerformance,
  listVolunteers,
};
