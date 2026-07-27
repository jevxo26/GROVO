import { prisma } from "../../lib/prisma";

const createAnalyticsSnapshot = async (payload: any) => {
  return await prisma.analyticsSnapshot.create({ data: payload });
};

const createDonationAnalytics = async (payload: any) => {
  return await prisma.donationAnalytics.create({ data: payload });
};

const createCampaignAnalytics = async (payload: any) => {
  return await prisma.campaignAnalytics.create({ data: payload });
};

const createProjectAnalytics = async (payload: any) => {
  return await prisma.projectAnalytics.create({ data: payload });
};

const createVolunteerAnalytics = async (payload: any) => {
  return await prisma.volunteerAnalytics.create({ data: payload });
};

const createBeneficiaryAnalytics = async (payload: any) => {
  return await prisma.beneficiaryAnalytics.create({ data: payload });
};

const createBranchAnalytics = async (payload: any) => {
  return await prisma.branchAnalytics.create({ data: payload });
};

const createFinancialAnalytics = async (payload: any) => {
  return await prisma.financialAnalytics.create({ data: payload });
};

const createMembershipAnalytics = async (payload: any) => {
  return await prisma.membershipAnalytics.create({ data: payload });
};

const createUserActivityAnalytics = async (payload: any) => {
  return await prisma.userActivityAnalytics.create({ data: payload });
};

export const AnalyticsMetricsService = {
  createAnalyticsSnapshot,
  createDonationAnalytics,
  createCampaignAnalytics,
  createProjectAnalytics,
  createVolunteerAnalytics,
  createBeneficiaryAnalytics,
  createBranchAnalytics,
  createFinancialAnalytics,
  createMembershipAnalytics,
  createUserActivityAnalytics,
};
