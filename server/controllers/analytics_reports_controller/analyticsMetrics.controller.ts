import status from "http-status";
import { analyticsMetricsService } from "../../services/analytics_reports_service/analyticsMetrics.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 5. ANALYTICS SNAPSHOT CONTROLLERS ====================
const createAnalyticsSnapshot = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createAnalyticsSnapshot(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Analytics snapshot created successfully",
    data: result,
  });
});

const getAllAnalyticsSnapshots = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllAnalyticsSnapshots();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshots retrieved successfully",
    data: result,
  });
});

const getAnalyticsSnapshotById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getAnalyticsSnapshotById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshot retrieved successfully",
    data: result,
  });
});

const updateAnalyticsSnapshot = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateAnalyticsSnapshot(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshot updated successfully",
    data: result,
  });
});

const deleteAnalyticsSnapshot = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteAnalyticsSnapshot(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Analytics snapshot deleted successfully",
    data: result,
  });
});


// ==================== 6. DONATION ANALYTICS CONTROLLERS ====================
const createDonationAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createDonationAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation analytics created successfully",
    data: result,
  });
});

const getAllDonationAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllDonationAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics retrieved successfully",
    data: result,
  });
});

const getDonationAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getDonationAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics retrieved successfully",
    data: result,
  });
});

const updateDonationAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateDonationAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics updated successfully",
    data: result,
  });
});

const deleteDonationAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteDonationAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation analytics deleted successfully",
    data: result,
  });
});


// ==================== 7. CAMPAIGN ANALYTICS CONTROLLERS ====================
const createCampaignAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createCampaignAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Campaign analytics created successfully",
    data: result,
  });
});

const getAllCampaignAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllCampaignAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics retrieved successfully",
    data: result,
  });
});

const getCampaignAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getCampaignAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics retrieved successfully",
    data: result,
  });
});

const updateCampaignAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateCampaignAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics updated successfully",
    data: result,
  });
});

const deleteCampaignAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteCampaignAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Campaign analytics deleted successfully",
    data: result,
  });
});


// ==================== 8. PROJECT ANALYTICS CONTROLLERS ====================
const createProjectAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createProjectAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project analytics created successfully",
    data: result,
  });
});

const getAllProjectAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllProjectAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics retrieved successfully",
    data: result,
  });
});

const getProjectAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getProjectAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics retrieved successfully",
    data: result,
  });
});

const updateProjectAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateProjectAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics updated successfully",
    data: result,
  });
});

const deleteProjectAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteProjectAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Project analytics deleted successfully",
    data: result,
  });
});


// ==================== 9. VOLUNTEER ANALYTICS CONTROLLERS ====================
const createVolunteerAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createVolunteerAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer analytics created successfully",
    data: result,
  });
});

const getAllVolunteerAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllVolunteerAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics retrieved successfully",
    data: result,
  });
});

const getVolunteerAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getVolunteerAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics retrieved successfully",
    data: result,
  });
});

const updateVolunteerAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateVolunteerAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics updated successfully",
    data: result,
  });
});

const deleteVolunteerAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteVolunteerAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer analytics deleted successfully",
    data: result,
  });
});


// ==================== 10. BENEFICIARY ANALYTICS CONTROLLERS ====================
const createBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createBeneficiaryAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary analytics created successfully",
    data: result,
  });
});

const getAllBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllBeneficiaryAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics retrieved successfully",
    data: result,
  });
});

const getBeneficiaryAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getBeneficiaryAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateBeneficiaryAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics updated successfully",
    data: result,
  });
});

const deleteBeneficiaryAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteBeneficiaryAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary analytics deleted successfully",
    data: result,
  });
});


// ==================== 11. BRANCH ANALYTICS CONTROLLERS ====================
const createBranchAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createBranchAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch analytics created successfully",
    data: result,
  });
});

const getAllBranchAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllBranchAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics retrieved successfully",
    data: result,
  });
});

const getBranchAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getBranchAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics retrieved successfully",
    data: result,
  });
});

const updateBranchAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateBranchAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics updated successfully",
    data: result,
  });
});

const deleteBranchAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteBranchAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch analytics deleted successfully",
    data: result,
  });
});


// ==================== 12. FINANCIAL ANALYTICS CONTROLLERS ====================
const createFinancialAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createFinancialAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Financial analytics created successfully",
    data: result,
  });
});

const getAllFinancialAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllFinancialAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics retrieved successfully",
    data: result,
  });
});

const getFinancialAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getFinancialAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics retrieved successfully",
    data: result,
  });
});

const updateFinancialAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateFinancialAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics updated successfully",
    data: result,
  });
});

const deleteFinancialAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteFinancialAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial analytics deleted successfully",
    data: result,
  });
});


// ==================== 13. MEMBERSHIP ANALYTICS CONTROLLERS ====================
const createMembershipAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createMembershipAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership analytics created successfully",
    data: result,
  });
});

const getAllMembershipAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllMembershipAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics retrieved successfully",
    data: result,
  });
});

const getMembershipAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getMembershipAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics retrieved successfully",
    data: result,
  });
});

const updateMembershipAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateMembershipAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics updated successfully",
    data: result,
  });
});

const deleteMembershipAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteMembershipAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership analytics deleted successfully",
    data: result,
  });
});


// ==================== 14. USER ACTIVITY ANALYTICS CONTROLLERS ====================
const createUserActivityAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.createUserActivityAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User activity analytics created successfully",
    data: result,
  });
});

const getAllUserActivityAnalytics = catchAsync(async (req, res) => {
  const result = await analyticsMetricsService.getAllUserActivityAnalytics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics retrieved successfully",
    data: result,
  });
});

const getUserActivityAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.getUserActivityAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics retrieved successfully",
    data: result,
  });
});

const updateUserActivityAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.updateUserActivityAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics updated successfully",
    data: result,
  });
});

const deleteUserActivityAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await analyticsMetricsService.deleteUserActivityAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User activity analytics deleted successfully",
    data: result,
  });
});


export const analyticsMetricsController = {
  // AnalyticsSnapshot
  createAnalyticsSnapshot,
  getAllAnalyticsSnapshots,
  getAnalyticsSnapshotById,
  updateAnalyticsSnapshot,
  deleteAnalyticsSnapshot,
  // DonationAnalytics
  createDonationAnalytics,
  getAllDonationAnalytics,
  getDonationAnalyticsById,
  updateDonationAnalytics,
  deleteDonationAnalytics,
  // CampaignAnalytics
  createCampaignAnalytics,
  getAllCampaignAnalytics,
  getCampaignAnalyticsById,
  updateCampaignAnalytics,
  deleteCampaignAnalytics,
  // ProjectAnalytics
  createProjectAnalytics,
  getAllProjectAnalytics,
  getProjectAnalyticsById,
  updateProjectAnalytics,
  deleteProjectAnalytics,
  // VolunteerAnalytics
  createVolunteerAnalytics,
  getAllVolunteerAnalytics,
  getVolunteerAnalyticsById,
  updateVolunteerAnalytics,
  deleteVolunteerAnalytics,
  // BeneficiaryAnalytics
  createBeneficiaryAnalytics,
  getAllBeneficiaryAnalytics,
  getBeneficiaryAnalyticsById,
  updateBeneficiaryAnalytics,
  deleteBeneficiaryAnalytics,
  // BranchAnalytics
  createBranchAnalytics,
  getAllBranchAnalytics,
  getBranchAnalyticsById,
  updateBranchAnalytics,
  deleteBranchAnalytics,
  // FinancialAnalytics
  createFinancialAnalytics,
  getAllFinancialAnalytics,
  getFinancialAnalyticsById,
  updateFinancialAnalytics,
  deleteFinancialAnalytics,
  // MembershipAnalytics
  createMembershipAnalytics,
  getAllMembershipAnalytics,
  getMembershipAnalyticsById,
  updateMembershipAnalytics,
  deleteMembershipAnalytics,
  // UserActivityAnalytics
  createUserActivityAnalytics,
  getAllUserActivityAnalytics,
  getUserActivityAnalyticsById,
  updateUserActivityAnalytics,
  deleteUserActivityAnalytics,
};
