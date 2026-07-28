import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 5. ANALYTICS SNAPSHOT SERVICES ====================
const createAnalyticsSnapshot = async (payload: any) => {
  return await prisma.analyticsSnapshot.create({
    data: {
      snapshotDate: payload.snapshotDate ? new Date(payload.snapshotDate) : new Date(),
      totalUsers: payload.totalUsers ? Number(payload.totalUsers) : 0,
      totalMembers: payload.totalMembers ? Number(payload.totalMembers) : 0,
      totalDonors: payload.totalDonors ? Number(payload.totalDonors) : 0,
      totalVolunteers: payload.totalVolunteers ? Number(payload.totalVolunteers) : 0,
      totalCampaigns: payload.totalCampaigns ? Number(payload.totalCampaigns) : 0,
      totalProjects: payload.totalProjects ? Number(payload.totalProjects) : 0,
      totalDonations: payload.totalDonations ? Number(payload.totalDonations) : 0.0,
      totalBeneficiaries: payload.totalBeneficiaries ? Number(payload.totalBeneficiaries) : 0,
    },
  });
};

const getAllAnalyticsSnapshots = async () => {
  return await prisma.analyticsSnapshot.findMany({
    orderBy: { snapshotDate: "desc" },
  });
};

const getAnalyticsSnapshotById = async (id: string) => {
  const item = await prisma.analyticsSnapshot.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Analytics snapshot not found.");
  }
  return item;
};

const updateAnalyticsSnapshot = async (id: string, payload: any) => {
  const item = await prisma.analyticsSnapshot.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Analytics snapshot not found.");
  }

  return await prisma.analyticsSnapshot.update({
    where: { id },
    data: {
      ...(payload.totalUsers !== undefined && { totalUsers: Number(payload.totalUsers) }),
      ...(payload.totalMembers !== undefined && { totalMembers: Number(payload.totalMembers) }),
      ...(payload.totalDonors !== undefined && { totalDonors: Number(payload.totalDonors) }),
      ...(payload.totalVolunteers !== undefined && { totalVolunteers: Number(payload.totalVolunteers) }),
      ...(payload.totalCampaigns !== undefined && { totalCampaigns: Number(payload.totalCampaigns) }),
      ...(payload.totalProjects !== undefined && { totalProjects: Number(payload.totalProjects) }),
      ...(payload.totalDonations !== undefined && { totalDonations: Number(payload.totalDonations) }),
      ...(payload.totalBeneficiaries !== undefined && { totalBeneficiaries: Number(payload.totalBeneficiaries) }),
    },
  });
};

const deleteAnalyticsSnapshot = async (id: string) => {
  const item = await prisma.analyticsSnapshot.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Analytics snapshot not found.");
  }
  await prisma.analyticsSnapshot.delete({ where: { id } });
  return { message: "Analytics snapshot deleted successfully." };
};


// ==================== 6. DONATION ANALYTICS SERVICES ====================
const createDonationAnalytics = async (payload: any) => {
  return await prisma.donationAnalytics.create({
    data: {
      date: payload.date ? new Date(payload.date) : new Date(),
      totalDonation: payload.totalDonation ? Number(payload.totalDonation) : 0.0,
      averageDonation: payload.averageDonation ? Number(payload.averageDonation) : 0.0,
      highestDonation: payload.highestDonation ? Number(payload.highestDonation) : 0.0,
      lowestDonation: payload.lowestDonation ? Number(payload.lowestDonation) : 0.0,
      currency: payload.currency || "BDT",
    },
  });
};

const getAllDonationAnalytics = async () => {
  return await prisma.donationAnalytics.findMany({
    orderBy: { date: "desc" },
  });
};

const getDonationAnalyticsById = async (id: string) => {
  const item = await prisma.donationAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation analytics record not found.");
  }
  return item;
};

const updateDonationAnalytics = async (id: string, payload: any) => {
  const item = await prisma.donationAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation analytics record not found.");
  }

  return await prisma.donationAnalytics.update({
    where: { id },
    data: {
      ...(payload.totalDonation !== undefined && { totalDonation: Number(payload.totalDonation) }),
      ...(payload.averageDonation !== undefined && { averageDonation: Number(payload.averageDonation) }),
      ...(payload.highestDonation !== undefined && { highestDonation: Number(payload.highestDonation) }),
      ...(payload.lowestDonation !== undefined && { lowestDonation: Number(payload.lowestDonation) }),
      ...(payload.currency && { currency: payload.currency }),
    },
  });
};

const deleteDonationAnalytics = async (id: string) => {
  const item = await prisma.donationAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation analytics record not found.");
  }
  await prisma.donationAnalytics.delete({ where: { id } });
  return { message: "Donation analytics record deleted successfully." };
};


// ==================== 7. CAMPAIGN ANALYTICS SERVICES ====================
const createCampaignAnalytics = async (payload: any) => {
  if (!payload.campaignId || payload.targetAmount === undefined) {
    throw new customError(status.BAD_REQUEST, "campaignId and targetAmount are required.");
  }

  return await prisma.campaignAnalytics.create({
    data: {
      campaignId: payload.campaignId,
      targetAmount: Number(payload.targetAmount),
      raisedAmount: payload.raisedAmount ? Number(payload.raisedAmount) : 0.0,
      donorCount: payload.donorCount ? Number(payload.donorCount) : 0,
      completionRate: payload.completionRate ? Number(payload.completionRate) : 0.0,
    },
  });
};

const getAllCampaignAnalytics = async (query?: { campaignId?: string }) => {
  const where: any = {};
  if (query?.campaignId) where.campaignId = query.campaignId;

  return await prisma.campaignAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getCampaignAnalyticsById = async (id: string) => {
  const item = await prisma.campaignAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Campaign analytics record not found.");
  }
  return item;
};

const updateCampaignAnalytics = async (id: string, payload: any) => {
  const item = await prisma.campaignAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Campaign analytics record not found.");
  }

  return await prisma.campaignAnalytics.update({
    where: { id },
    data: {
      ...(payload.targetAmount !== undefined && { targetAmount: Number(payload.targetAmount) }),
      ...(payload.raisedAmount !== undefined && { raisedAmount: Number(payload.raisedAmount) }),
      ...(payload.donorCount !== undefined && { donorCount: Number(payload.donorCount) }),
      ...(payload.completionRate !== undefined && { completionRate: Number(payload.completionRate) }),
    },
  });
};

const deleteCampaignAnalytics = async (id: string) => {
  const item = await prisma.campaignAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Campaign analytics record not found.");
  }
  await prisma.campaignAnalytics.delete({ where: { id } });
  return { message: "Campaign analytics record deleted successfully." };
};


// ==================== 8. PROJECT ANALYTICS SERVICES ====================
const createProjectAnalytics = async (payload: any) => {
  if (!payload.projectId || payload.budget === undefined || payload.remainingBudget === undefined) {
    throw new customError(status.BAD_REQUEST, "projectId, budget, and remainingBudget are required.");
  }

  return await prisma.projectAnalytics.create({
    data: {
      projectId: payload.projectId,
      budget: Number(payload.budget),
      expense: payload.expense ? Number(payload.expense) : 0.0,
      remainingBudget: Number(payload.remainingBudget),
      beneficiaryCount: payload.beneficiaryCount ? Number(payload.beneficiaryCount) : 0,
      completionRate: payload.completionRate ? Number(payload.completionRate) : 0.0,
    },
  });
};

const getAllProjectAnalytics = async (query?: { projectId?: string }) => {
  const where: any = {};
  if (query?.projectId) where.projectId = query.projectId;

  return await prisma.projectAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getProjectAnalyticsById = async (id: string) => {
  const item = await prisma.projectAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Project analytics record not found.");
  }
  return item;
};

const updateProjectAnalytics = async (id: string, payload: any) => {
  const item = await prisma.projectAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Project analytics record not found.");
  }

  return await prisma.projectAnalytics.update({
    where: { id },
    data: {
      ...(payload.budget !== undefined && { budget: Number(payload.budget) }),
      ...(payload.expense !== undefined && { expense: Number(payload.expense) }),
      ...(payload.remainingBudget !== undefined && { remainingBudget: Number(payload.remainingBudget) }),
      ...(payload.beneficiaryCount !== undefined && { beneficiaryCount: Number(payload.beneficiaryCount) }),
      ...(payload.completionRate !== undefined && { completionRate: Number(payload.completionRate) }),
    },
  });
};

const deleteProjectAnalytics = async (id: string) => {
  const item = await prisma.projectAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Project analytics record not found.");
  }
  await prisma.projectAnalytics.delete({ where: { id } });
  return { message: "Project analytics record deleted successfully." };
};


// ==================== 9. VOLUNTEER ANALYTICS SERVICES ====================
const createVolunteerAnalytics = async (payload: any) => {
  if (!payload.volunteerId) {
    throw new customError(status.BAD_REQUEST, "volunteerId is required.");
  }

  return await prisma.volunteerAnalytics.create({
    data: {
      volunteerId: payload.volunteerId,
      completedTasks: payload.completedTasks ? Number(payload.completedTasks) : 0,
      attendanceRate: payload.attendanceRate ? Number(payload.attendanceRate) : 0.0,
      performanceScore: payload.performanceScore ? Number(payload.performanceScore) : 0.0,
      hoursServed: payload.hoursServed ? Number(payload.hoursServed) : 0.0,
    },
  });
};

const getAllVolunteerAnalytics = async (query?: { volunteerId?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;

  return await prisma.volunteerAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerAnalyticsById = async (id: string) => {
  const item = await prisma.volunteerAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer analytics record not found.");
  }
  return item;
};

const updateVolunteerAnalytics = async (id: string, payload: any) => {
  const item = await prisma.volunteerAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer analytics record not found.");
  }

  return await prisma.volunteerAnalytics.update({
    where: { id },
    data: {
      ...(payload.completedTasks !== undefined && { completedTasks: Number(payload.completedTasks) }),
      ...(payload.attendanceRate !== undefined && { attendanceRate: Number(payload.attendanceRate) }),
      ...(payload.performanceScore !== undefined && { performanceScore: Number(payload.performanceScore) }),
      ...(payload.hoursServed !== undefined && { hoursServed: Number(payload.hoursServed) }),
    },
  });
};

const deleteVolunteerAnalytics = async (id: string) => {
  const item = await prisma.volunteerAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer analytics record not found.");
  }
  await prisma.volunteerAnalytics.delete({ where: { id } });
  return { message: "Volunteer analytics record deleted successfully." };
};


// ==================== 10. BENEFICIARY ANALYTICS SERVICES ====================
const createBeneficiaryAnalytics = async (payload: any) => {
  if (!payload.beneficiaryCategory) {
    throw new customError(status.BAD_REQUEST, "beneficiaryCategory is required.");
  }

  return await prisma.beneficiaryAnalytics.create({
    data: {
      beneficiaryCategory: payload.beneficiaryCategory,
      totalBeneficiaries: payload.totalBeneficiaries ? Number(payload.totalBeneficiaries) : 0,
      totalSupportValue: payload.totalSupportValue ? Number(payload.totalSupportValue) : 0.0,
      activeCases: payload.activeCases ? Number(payload.activeCases) : 0,
      closedCases: payload.closedCases ? Number(payload.closedCases) : 0,
    },
  });
};

const getAllBeneficiaryAnalytics = async () => {
  return await prisma.beneficiaryAnalytics.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryAnalyticsById = async (id: string) => {
  const item = await prisma.beneficiaryAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary analytics record not found.");
  }
  return item;
};

const updateBeneficiaryAnalytics = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary analytics record not found.");
  }

  return await prisma.beneficiaryAnalytics.update({
    where: { id },
    data: {
      ...(payload.beneficiaryCategory && { beneficiaryCategory: payload.beneficiaryCategory }),
      ...(payload.totalBeneficiaries !== undefined && { totalBeneficiaries: Number(payload.totalBeneficiaries) }),
      ...(payload.totalSupportValue !== undefined && { totalSupportValue: Number(payload.totalSupportValue) }),
      ...(payload.activeCases !== undefined && { activeCases: Number(payload.activeCases) }),
      ...(payload.closedCases !== undefined && { closedCases: Number(payload.closedCases) }),
    },
  });
};

const deleteBeneficiaryAnalytics = async (id: string) => {
  const item = await prisma.beneficiaryAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary analytics record not found.");
  }
  await prisma.beneficiaryAnalytics.delete({ where: { id } });
  return { message: "Beneficiary analytics record deleted successfully." };
};


// ==================== 11. BRANCH ANALYTICS SERVICES ====================
const createBranchAnalytics = async (payload: any) => {
  if (!payload.branchId) {
    throw new customError(status.BAD_REQUEST, "branchId is required.");
  }

  return await prisma.branchAnalytics.create({
    data: {
      branchId: payload.branchId,
      memberCount: payload.memberCount ? Number(payload.memberCount) : 0,
      donationAmount: payload.donationAmount ? Number(payload.donationAmount) : 0.0,
      campaignCount: payload.campaignCount ? Number(payload.campaignCount) : 0,
      projectCount: payload.projectCount ? Number(payload.projectCount) : 0,
      beneficiaryCount: payload.beneficiaryCount ? Number(payload.beneficiaryCount) : 0,
    },
  });
};

const getAllBranchAnalytics = async (query?: { branchId?: string }) => {
  const where: any = {};
  if (query?.branchId) where.branchId = query.branchId;

  return await prisma.branchAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBranchAnalyticsById = async (id: string) => {
  const item = await prisma.branchAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Branch analytics record not found.");
  }
  return item;
};

const updateBranchAnalytics = async (id: string, payload: any) => {
  const item = await prisma.branchAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Branch analytics record not found.");
  }

  return await prisma.branchAnalytics.update({
    where: { id },
    data: {
      ...(payload.memberCount !== undefined && { memberCount: Number(payload.memberCount) }),
      ...(payload.donationAmount !== undefined && { donationAmount: Number(payload.donationAmount) }),
      ...(payload.campaignCount !== undefined && { campaignCount: Number(payload.campaignCount) }),
      ...(payload.projectCount !== undefined && { projectCount: Number(payload.projectCount) }),
      ...(payload.beneficiaryCount !== undefined && { beneficiaryCount: Number(payload.beneficiaryCount) }),
    },
  });
};

const deleteBranchAnalytics = async (id: string) => {
  const item = await prisma.branchAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Branch analytics record not found.");
  }
  await prisma.branchAnalytics.delete({ where: { id } });
  return { message: "Branch analytics record deleted successfully." };
};


// ==================== 12. FINANCIAL ANALYTICS SERVICES ====================
const createFinancialAnalytics = async (payload: any) => {
  return await prisma.financialAnalytics.create({
    data: {
      reportDate: payload.reportDate ? new Date(payload.reportDate) : new Date(),
      income: payload.income ? Number(payload.income) : 0.0,
      expense: payload.expense ? Number(payload.expense) : 0.0,
      netBalance: payload.netBalance ? Number(payload.netBalance) : 0.0,
      pendingPayments: payload.pendingPayments ? Number(payload.pendingPayments) : 0.0,
      refundAmount: payload.refundAmount ? Number(payload.refundAmount) : 0.0,
    },
  });
};

const getAllFinancialAnalytics = async () => {
  return await prisma.financialAnalytics.findMany({
    orderBy: { reportDate: "desc" },
  });
};

const getFinancialAnalyticsById = async (id: string) => {
  const item = await prisma.financialAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Financial analytics record not found.");
  }
  return item;
};

const updateFinancialAnalytics = async (id: string, payload: any) => {
  const item = await prisma.financialAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Financial analytics record not found.");
  }

  return await prisma.financialAnalytics.update({
    where: { id },
    data: {
      ...(payload.income !== undefined && { income: Number(payload.income) }),
      ...(payload.expense !== undefined && { expense: Number(payload.expense) }),
      ...(payload.netBalance !== undefined && { netBalance: Number(payload.netBalance) }),
      ...(payload.pendingPayments !== undefined && { pendingPayments: Number(payload.pendingPayments) }),
      ...(payload.refundAmount !== undefined && { refundAmount: Number(payload.refundAmount) }),
    },
  });
};

const deleteFinancialAnalytics = async (id: string) => {
  const item = await prisma.financialAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Financial analytics record not found.");
  }
  await prisma.financialAnalytics.delete({ where: { id } });
  return { message: "Financial analytics record deleted successfully." };
};


// ==================== 13. MEMBERSHIP ANALYTICS SERVICES ====================
const createMembershipAnalytics = async (payload: any) => {
  if (!payload.membershipType) {
    throw new customError(status.BAD_REQUEST, "membershipType is required.");
  }

  return await prisma.membershipAnalytics.create({
    data: {
      membershipType: payload.membershipType,
      totalMembers: payload.totalMembers ? Number(payload.totalMembers) : 0,
      newMembers: payload.newMembers ? Number(payload.newMembers) : 0,
      renewals: payload.renewals ? Number(payload.renewals) : 0,
      expiredMemberships: payload.expiredMemberships ? Number(payload.expiredMemberships) : 0,
    },
  });
};

const getAllMembershipAnalytics = async () => {
  return await prisma.membershipAnalytics.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getMembershipAnalyticsById = async (id: string) => {
  const item = await prisma.membershipAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership analytics record not found.");
  }
  return item;
};

const updateMembershipAnalytics = async (id: string, payload: any) => {
  const item = await prisma.membershipAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership analytics record not found.");
  }

  return await prisma.membershipAnalytics.update({
    where: { id },
    data: {
      ...(payload.membershipType && { membershipType: payload.membershipType }),
      ...(payload.totalMembers !== undefined && { totalMembers: Number(payload.totalMembers) }),
      ...(payload.newMembers !== undefined && { newMembers: Number(payload.newMembers) }),
      ...(payload.renewals !== undefined && { renewals: Number(payload.renewals) }),
      ...(payload.expiredMemberships !== undefined && { expiredMemberships: Number(payload.expiredMemberships) }),
    },
  });
};

const deleteMembershipAnalytics = async (id: string) => {
  const item = await prisma.membershipAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Membership analytics record not found.");
  }
  await prisma.membershipAnalytics.delete({ where: { id } });
  return { message: "Membership analytics record deleted successfully." };
};


// ==================== 14. USER ACTIVITY ANALYTICS SERVICES ====================
const createUserActivityAnalytics = async (payload: any) => {
  if (!payload.userId) {
    throw new customError(status.BAD_REQUEST, "userId is required.");
  }

  return await prisma.userActivityAnalytics.create({
    data: {
      userId: payload.userId,
      loginCount: payload.loginCount ? Number(payload.loginCount) : 0,
      activeDays: payload.activeDays ? Number(payload.activeDays) : 0,
      lastActive: payload.lastActive ? new Date(payload.lastActive) : null,
      deviceCount: payload.deviceCount ? Number(payload.deviceCount) : 1,
    },
  });
};

const getAllUserActivityAnalytics = async (query?: { userId?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;

  return await prisma.userActivityAnalytics.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getUserActivityAnalyticsById = async (id: string) => {
  const item = await prisma.userActivityAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "User activity analytics record not found.");
  }
  return item;
};

const updateUserActivityAnalytics = async (id: string, payload: any) => {
  const item = await prisma.userActivityAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "User activity analytics record not found.");
  }

  return await prisma.userActivityAnalytics.update({
    where: { id },
    data: {
      ...(payload.loginCount !== undefined && { loginCount: Number(payload.loginCount) }),
      ...(payload.activeDays !== undefined && { activeDays: Number(payload.activeDays) }),
      ...(payload.lastActive !== undefined && { lastActive: payload.lastActive ? new Date(payload.lastActive) : null }),
      ...(payload.deviceCount !== undefined && { deviceCount: Number(payload.deviceCount) }),
    },
  });
};

const deleteUserActivityAnalytics = async (id: string) => {
  const item = await prisma.userActivityAnalytics.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "User activity analytics record not found.");
  }
  await prisma.userActivityAnalytics.delete({ where: { id } });
  return { message: "User activity analytics record deleted successfully." };
};


export const analyticsMetricsService = {
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
