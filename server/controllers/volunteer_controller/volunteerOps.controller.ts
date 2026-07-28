import status from "http-status";
import { volunteerOpsService } from "../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 5. VOLUNTEER ASSIGNMENT CONTROLLERS ====================
const createVolunteerAssignment = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerAssignment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer assignment created successfully",
    data: result,
  });
});

const getAllVolunteerAssignments = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerAssignments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignments retrieved successfully",
    data: result,
  });
});

const getVolunteerAssignmentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerAssignmentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignment retrieved successfully",
    data: result,
  });
});

const updateVolunteerAssignment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerAssignment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignment updated successfully",
    data: result,
  });
});

const deleteVolunteerAssignment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerAssignment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer assignment deleted successfully",
    data: result,
  });
});


// ==================== 6. VOLUNTEER SCHEDULE CONTROLLERS ====================
const createVolunteerSchedule = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer schedule created successfully",
    data: result,
  });
});

const getAllVolunteerSchedules = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedules retrieved successfully",
    data: result,
  });
});

const getVolunteerScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerScheduleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedule retrieved successfully",
    data: result,
  });
});

const updateVolunteerSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerSchedule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedule updated successfully",
    data: result,
  });
});

const deleteVolunteerSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerSchedule(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer schedule deleted successfully",
    data: result,
  });
});


// ==================== 7. VOLUNTEER ATTENDANCE CONTROLLERS ====================
const createVolunteerAttendance = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerAttendance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer attendance recorded successfully",
    data: result,
  });
});

const getAllVolunteerAttendances = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerAttendances(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendances retrieved successfully",
    data: result,
  });
});

const getVolunteerAttendanceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerAttendanceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendance retrieved successfully",
    data: result,
  });
});

const updateVolunteerAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerAttendance(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendance updated successfully",
    data: result,
  });
});

const deleteVolunteerAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerAttendance(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer attendance deleted successfully",
    data: result,
  });
});


// ==================== 8. VOLUNTEER TASK CONTROLLERS ====================
const createVolunteerTask = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerTask(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer task created successfully",
    data: result,
  });
});

const getAllVolunteerTasks = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllVolunteerTasks(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer tasks retrieved successfully",
    data: result,
  });
});

const getVolunteerTaskById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getVolunteerTaskById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer task retrieved successfully",
    data: result,
  });
});

const updateVolunteerTask = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateVolunteerTask(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer task updated successfully",
    data: result,
  });
});

const deleteVolunteerTask = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteVolunteerTask(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer task deleted successfully",
    data: result,
  });
});


// ==================== 9. FIELD ACTIVITY CONTROLLERS ====================
const createFieldActivity = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createFieldActivity(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Field activity created successfully",
    data: result,
  });
});

const getAllFieldActivities = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllFieldActivities(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activities retrieved successfully",
    data: result,
  });
});

const getFieldActivityById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getFieldActivityById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activity retrieved successfully",
    data: result,
  });
});

const updateFieldActivity = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateFieldActivity(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activity updated successfully",
    data: result,
  });
});

const deleteFieldActivity = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteFieldActivity(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activity deleted successfully",
    data: result,
  });
});


// ==================== 10. FIELD VISIT CONTROLLERS ====================
const createFieldVisit = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createFieldVisit(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Field visit created successfully",
    data: result,
  });
});

const getAllFieldVisits = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllFieldVisits(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visits retrieved successfully",
    data: result,
  });
});

const getFieldVisitById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getFieldVisitById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visit retrieved successfully",
    data: result,
  });
});

const updateFieldVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateFieldVisit(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visit updated successfully",
    data: result,
  });
});

const deleteFieldVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteFieldVisit(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visit deleted successfully",
    data: result,
  });
});


// ==================== 11. ACTIVITY REPORT CONTROLLERS ====================
const createActivityReport = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createActivityReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Activity report created successfully",
    data: result,
  });
});

const getAllActivityReports = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllActivityReports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity reports retrieved successfully",
    data: result,
  });
});

const getActivityReportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getActivityReportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity report retrieved successfully",
    data: result,
  });
});

const updateActivityReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateActivityReport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity report updated successfully",
    data: result,
  });
});

const deleteActivityReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteActivityReport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity report deleted successfully",
    data: result,
  });
});


// ==================== 12. BENEFICIARY VERIFICATION CONTROLLERS ====================
const createBeneficiaryVerification = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createBeneficiaryVerification(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary verification created successfully",
    data: result,
  });
});

const getAllBeneficiaryVerifications = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllBeneficiaryVerifications(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verifications retrieved successfully",
    data: result,
  });
});

const getBeneficiaryVerificationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getBeneficiaryVerificationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateBeneficiaryVerification(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification updated successfully",
    data: result,
  });
});

const deleteBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteBeneficiaryVerification(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification deleted successfully",
    data: result,
  });
});


export const volunteerOpsController = {
  // VolunteerAssignment
  createVolunteerAssignment,
  getAllVolunteerAssignments,
  getVolunteerAssignmentById,
  updateVolunteerAssignment,
  deleteVolunteerAssignment,
  // VolunteerSchedule
  createVolunteerSchedule,
  getAllVolunteerSchedules,
  getVolunteerScheduleById,
  updateVolunteerSchedule,
  deleteVolunteerSchedule,
  // VolunteerAttendance
  createVolunteerAttendance,
  getAllVolunteerAttendances,
  getVolunteerAttendanceById,
  updateVolunteerAttendance,
  deleteVolunteerAttendance,
  // VolunteerTask
  createVolunteerTask,
  getAllVolunteerTasks,
  getVolunteerTaskById,
  updateVolunteerTask,
  deleteVolunteerTask,
  // FieldActivity
  createFieldActivity,
  getAllFieldActivities,
  getFieldActivityById,
  updateFieldActivity,
  deleteFieldActivity,
  // FieldVisit
  createFieldVisit,
  getAllFieldVisits,
  getFieldVisitById,
  updateFieldVisit,
  deleteFieldVisit,
  // ActivityReport
  createActivityReport,
  getAllActivityReports,
  getActivityReportById,
  updateActivityReport,
  deleteActivityReport,
  // BeneficiaryVerification
  createBeneficiaryVerification,
  getAllBeneficiaryVerifications,
  getBeneficiaryVerificationById,
  updateBeneficiaryVerification,
  deleteBeneficiaryVerification,
};
