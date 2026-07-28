import status from "http-status";
import { volunteerCoreService } from "../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 1. VOLUNTEER CONTROLLERS ====================
const createVolunteer = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteer(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer created successfully",
    data: result,
  });
});

const getAllVolunteers = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteers retrieved successfully",
    data: result,
  });
});

const getVolunteerById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer retrieved successfully",
    data: result,
  });
});

const updateVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteer(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer updated successfully",
    data: result,
  });
});

const deleteVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteer(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer deleted successfully",
    data: result,
  });
});


// ==================== 2. VOLUNTEER PROFILE CONTROLLERS ====================
const createVolunteerProfile = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerProfile(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer profile created successfully",
    data: result,
  });
});

const getAllVolunteerProfiles = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerProfiles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profiles retrieved successfully",
    data: result,
  });
});

const getVolunteerProfileById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerProfileById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profile retrieved successfully",
    data: result,
  });
});

const updateVolunteerProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerProfile(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profile updated successfully",
    data: result,
  });
});

const deleteVolunteerProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerProfile(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer profile deleted successfully",
    data: result,
  });
});


// ==================== 3. VOLUNTEER SKILL CONTROLLERS ====================
const createVolunteerSkill = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerSkill(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer skill created successfully",
    data: result,
  });
});

const getAllVolunteerSkills = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerSkills(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skills retrieved successfully",
    data: result,
  });
});

const getVolunteerSkillById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerSkillById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skill retrieved successfully",
    data: result,
  });
});

const updateVolunteerSkill = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerSkill(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skill updated successfully",
    data: result,
  });
});

const deleteVolunteerSkill = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerSkill(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer skill deleted successfully",
    data: result,
  });
});


// ==================== 4. VOLUNTEER AVAILABILITY CONTROLLERS ====================
const createVolunteerAvailability = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerAvailability(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer availability created successfully",
    data: result,
  });
});

const getAllVolunteerAvailabilities = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerAvailabilities(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availabilities retrieved successfully",
    data: result,
  });
});

const getVolunteerAvailabilityById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerAvailabilityById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availability retrieved successfully",
    data: result,
  });
});

const updateVolunteerAvailability = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerAvailability(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availability updated successfully",
    data: result,
  });
});

const deleteVolunteerAvailability = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerAvailability(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer availability deleted successfully",
    data: result,
  });
});


// ==================== 20. VOLUNTEER DOCUMENT CONTROLLERS ====================
const createVolunteerDocument = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerDocument(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer document uploaded successfully",
    data: result,
  });
});

const getAllVolunteerDocuments = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerDocuments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer documents retrieved successfully",
    data: result,
  });
});

const getVolunteerDocumentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerDocumentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer document retrieved successfully",
    data: result,
  });
});

const updateVolunteerDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerDocument(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer document updated successfully",
    data: result,
  });
});

const deleteVolunteerDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerDocument(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer document deleted successfully",
    data: result,
  });
});


// ==================== 21. VOLUNTEER ACTIVITY LOG CONTROLLERS ====================
const createVolunteerActivityLog = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer activity log created successfully",
    data: result,
  });
});

const getAllVolunteerActivityLogs = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerActivityLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer activity logs retrieved successfully",
    data: result,
  });
});

const getVolunteerActivityLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerActivityLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer activity log retrieved successfully",
    data: result,
  });
});

const deleteVolunteerActivityLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerActivityLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer activity log deleted successfully",
    data: result,
  });
});


export const volunteerCoreController = {
  // Volunteer
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  // VolunteerProfile
  createVolunteerProfile,
  getAllVolunteerProfiles,
  getVolunteerProfileById,
  updateVolunteerProfile,
  deleteVolunteerProfile,
  // VolunteerSkill
  createVolunteerSkill,
  getAllVolunteerSkills,
  getVolunteerSkillById,
  updateVolunteerSkill,
  deleteVolunteerSkill,
  // VolunteerAvailability
  createVolunteerAvailability,
  getAllVolunteerAvailabilities,
  getVolunteerAvailabilityById,
  updateVolunteerAvailability,
  deleteVolunteerAvailability,
  // VolunteerDocument
  createVolunteerDocument,
  getAllVolunteerDocuments,
  getVolunteerDocumentById,
  updateVolunteerDocument,
  deleteVolunteerDocument,
  // VolunteerActivityLog
  createVolunteerActivityLog,
  getAllVolunteerActivityLogs,
  getVolunteerActivityLogById,
  deleteVolunteerActivityLog,
};
