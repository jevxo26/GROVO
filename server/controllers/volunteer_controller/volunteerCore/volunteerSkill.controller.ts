import status from "http-status";
import { volunteerCoreService } from "../../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 3. VOLUNTEER SKILL CONTROLLERS ====================
export const createVolunteerSkill = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerSkill(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer skill created successfully",
    data: result,
  });
});

export const getAllVolunteerSkills = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerSkills(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skills retrieved successfully",
    data: result,
  });
});

export const getVolunteerSkillById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerSkillById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skill retrieved successfully",
    data: result,
  });
});

export const updateVolunteerSkill = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerSkill(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skill updated successfully",
    data: result,
  });
});

export const deleteVolunteerSkill = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerSkill(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skill deleted successfully",
    data: result,
  });
});
