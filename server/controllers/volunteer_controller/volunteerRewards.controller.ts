import status from "http-status";
import { volunteerRewardsService } from "../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 13. VOLUNTEER PERFORMANCE CONTROLLERS ====================
const createVolunteerPerformance = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerPerformance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer performance created successfully",
    data: result,
  });
});

const getAllVolunteerPerformances = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerPerformances(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performances retrieved successfully",
    data: result,
  });
});

const getVolunteerPerformanceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerPerformanceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performance retrieved successfully",
    data: result,
  });
});

const updateVolunteerPerformance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerPerformance(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performance updated successfully",
    data: result,
  });
});

const deleteVolunteerPerformance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerPerformance(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer performance deleted successfully",
    data: result,
  });
});


// ==================== 14. VOLUNTEER REWARD CONTROLLERS ====================
const createVolunteerReward = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerReward(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer reward created successfully",
    data: result,
  });
});

const getAllVolunteerRewards = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerRewards(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer rewards retrieved successfully",
    data: result,
  });
});

const getVolunteerRewardById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerRewardById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reward retrieved successfully",
    data: result,
  });
});

const updateVolunteerReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerReward(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reward updated successfully",
    data: result,
  });
});

const deleteVolunteerReward = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerReward(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reward deleted successfully",
    data: result,
  });
});


// ==================== 15. VOLUNTEER CERTIFICATE CONTROLLERS ====================
const createVolunteerCertificate = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerCertificate(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer certificate created successfully",
    data: result,
  });
});

const getAllVolunteerCertificates = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerCertificates(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificates retrieved successfully",
    data: result,
  });
});

const getVolunteerCertificateById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerCertificateById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificate retrieved successfully",
    data: result,
  });
});

const updateVolunteerCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerCertificate(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificate updated successfully",
    data: result,
  });
});

const deleteVolunteerCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerCertificate(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer certificate deleted successfully",
    data: result,
  });
});


// ==================== 16. VOLUNTEER EXPENSE CONTROLLERS ====================
const createVolunteerExpense = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerExpense(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer expense created successfully",
    data: result,
  });
});

const getAllVolunteerExpenses = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerExpenses(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expenses retrieved successfully",
    data: result,
  });
});

const getVolunteerExpenseById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerExpenseById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expense retrieved successfully",
    data: result,
  });
});

const updateVolunteerExpense = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerExpense(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expense updated successfully",
    data: result,
  });
});

const deleteVolunteerExpense = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerExpense(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expense deleted successfully",
    data: result,
  });
});


// ==================== 17. VOLUNTEER REIMBURSEMENT CONTROLLERS ====================
const createVolunteerReimbursement = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerReimbursement(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer reimbursement created successfully",
    data: result,
  });
});

const getAllVolunteerReimbursements = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerReimbursements(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursements retrieved successfully",
    data: result,
  });
});

const getVolunteerReimbursementById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerReimbursementById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursement retrieved successfully",
    data: result,
  });
});

const updateVolunteerReimbursement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerReimbursement(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursement updated successfully",
    data: result,
  });
});

const deleteVolunteerReimbursement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerReimbursement(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursement deleted successfully",
    data: result,
  });
});


// ==================== 18. VOLUNTEER ANNOUNCEMENT CONTROLLERS ====================
const createVolunteerAnnouncement = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerAnnouncement(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer announcement created successfully",
    data: result,
  });
});

const getAllVolunteerAnnouncements = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerAnnouncements(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcements retrieved successfully",
    data: result,
  });
});

const getVolunteerAnnouncementById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerAnnouncementById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcement retrieved successfully",
    data: result,
  });
});

const updateVolunteerAnnouncement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerAnnouncement(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcement updated successfully",
    data: result,
  });
});

const deleteVolunteerAnnouncement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerAnnouncement(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer announcement deleted successfully",
    data: result,
  });
});


// ==================== 19. VOLUNTEER TRAINING CONTROLLERS ====================
const createVolunteerTraining = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerTraining(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer training created successfully",
    data: result,
  });
});

const getAllVolunteerTrainings = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerTrainings(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer trainings retrieved successfully",
    data: result,
  });
});

const getVolunteerTrainingById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerTrainingById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer training retrieved successfully",
    data: result,
  });
});

const updateVolunteerTraining = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerTraining(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer training updated successfully",
    data: result,
  });
});

const deleteVolunteerTraining = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerTraining(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer training deleted successfully",
    data: result,
  });
});


export const volunteerRewardsController = {
  // VolunteerPerformance
  createVolunteerPerformance,
  getAllVolunteerPerformances,
  getVolunteerPerformanceById,
  updateVolunteerPerformance,
  deleteVolunteerPerformance,
  // VolunteerReward
  createVolunteerReward,
  getAllVolunteerRewards,
  getVolunteerRewardById,
  updateVolunteerReward,
  deleteVolunteerReward,
  // VolunteerCertificate
  createVolunteerCertificate,
  getAllVolunteerCertificates,
  getVolunteerCertificateById,
  updateVolunteerCertificate,
  deleteVolunteerCertificate,
  // VolunteerExpense
  createVolunteerExpense,
  getAllVolunteerExpenses,
  getVolunteerExpenseById,
  updateVolunteerExpense,
  deleteVolunteerExpense,
  // VolunteerReimbursement
  createVolunteerReimbursement,
  getAllVolunteerReimbursements,
  getVolunteerReimbursementById,
  updateVolunteerReimbursement,
  deleteVolunteerReimbursement,
  // VolunteerAnnouncement
  createVolunteerAnnouncement,
  getAllVolunteerAnnouncements,
  getVolunteerAnnouncementById,
  updateVolunteerAnnouncement,
  deleteVolunteerAnnouncement,
  // VolunteerTraining
  createVolunteerTraining,
  getAllVolunteerTrainings,
  getVolunteerTrainingById,
  updateVolunteerTraining,
  deleteVolunteerTraining,
};
