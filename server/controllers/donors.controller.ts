import httpStatus from "http-status";
import customError from "../error/customError";
import { donorsService } from "../services/donors.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerDonor = catchAsync(async (req, res) => {
  const { user_id, profession, organization, monthly_commitment, preferred_campaign } = req.body;
  const userId = user_id || req.headers["x-user-id"];

  if (!userId) {
    throw new customError(httpStatus.BAD_REQUEST, "User ID is required.");
  }

  const result = await donorsService.registerDonor({
    userId: String(userId),
    profession,
    organization,
    monthlyCommitment: monthly_commitment ? Number(monthly_commitment) : undefined,
    preferredCampaign: preferred_campaign,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Donor profile created successfully",
    data: result,
  });
});

const registerCorporateDonor = catchAsync(async (req, res) => {
  const {
    user_id, company_name, company_registration_no, trade_license,
    contact_person, designation, website, logo, monthly_commitment,
    industry, company_size, employee_count, address, city, country,
  } = req.body;

  const userId = user_id || req.headers["x-user-id"];

  if (!userId || !company_name) {
    throw new customError(httpStatus.BAD_REQUEST, "User ID and company name are required.");
  }

  const result = await donorsService.registerCorporateDonor({
    userId: String(userId),
    companyName: company_name,
    companyRegistrationNo: company_registration_no,
    tradeLicense: trade_license,
    contactPerson: contact_person,
    designation,
    website,
    logo,
    monthlyCommitment: monthly_commitment ? Number(monthly_commitment) : undefined,
    industry,
    companySize: company_size,
    employeeCount: employee_count ? Number(employee_count) : undefined,
    address,
    city,
    country,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Corporate donor profile created successfully",
    data: result,
  });
});

const createSubscription = catchAsync(async (req, res) => {
  const { donor_id, subscription_type, amount, billing_cycle } = req.body;
  const donorId = donor_id || req.headers["x-donor-id"];

  if (!donorId || !subscription_type || !amount || !billing_cycle) {
    throw new customError(httpStatus.BAD_REQUEST, "donorId, subscriptionType, amount, and billingCycle are required.");
  }

  const result = await donorsService.createSubscription({
    donorId: String(donorId),
    subscriptionType: subscription_type,
    amount: Number(amount),
    billingCycle: billing_cycle,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Subscription plan created successfully",
    data: result,
  });
});

const getSubscriptions = catchAsync(async (req, res) => {
  const donorId = req.query.donor_id || req.headers["x-donor-id"];

  if (!donorId) {
    throw new customError(httpStatus.BAD_REQUEST, "Donor ID is required.");
  }

  const result = await donorsService.getSubscriptions(String(donorId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Subscriptions retrieved",
    data: result,
  });
});

const createCommitment = catchAsync(async (req, res) => {
  const { donor_id, campaign_id, pledged_amount } = req.body;
  const donorId = donor_id || req.headers["x-donor-id"];

  if (!donorId || !pledged_amount) {
    throw new customError(httpStatus.BAD_REQUEST, "donorId and pledgedAmount are required.");
  }

  const result = await donorsService.createCommitment({
    donorId: String(donorId),
    campaignId: campaign_id,
    pledgedAmount: Number(pledged_amount),
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Commitment recorded successfully",
    data: result,
  });
});

const getWallet = catchAsync(async (req, res) => {
  const donorId = req.query.donor_id || req.headers["x-donor-id"];

  if (!donorId) {
    throw new customError(httpStatus.BAD_REQUEST, "Donor ID is required.");
  }

  const result = await donorsService.getWallet(String(donorId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Wallet statistics retrieved",
    data: result,
  });
});

const getRecognitions = catchAsync(async (req, res) => {
  const donorId = req.query.donor_id || req.headers["x-donor-id"];

  if (!donorId) {
    throw new customError(httpStatus.BAD_REQUEST, "Donor ID is required.");
  }

  const result = await donorsService.getRecognitions(String(donorId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Badges and certificates retrieved",
    data: result,
  });
});

const updatePreferences = catchAsync(async (req, res) => {
  const { donor_id, preferred_category, preferred_campaign, anonymous_donation, email_notification, sms_notification, push_notification } = req.body;
  const donorId = donor_id || req.headers["x-donor-id"];

  if (!donorId) {
    throw new customError(httpStatus.BAD_REQUEST, "Donor ID is required.");
  }

  const result = await donorsService.updatePreferences(String(donorId), {
    preferredCategory: preferred_category,
    preferredCampaign: preferred_campaign,
    anonymousDonation: anonymous_donation,
    emailNotification: email_notification,
    smsNotification: sms_notification,
    pushNotification: push_notification,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Preferences updated",
    data: result,
  });
});

const getCsrReport = catchAsync(async (req, res) => {
  const donorId = req.query.donor_id || req.headers["x-donor-id"];

  if (!donorId) {
    throw new customError(httpStatus.BAD_REQUEST, "Donor ID is required.");
  }

  const result = await donorsService.getCsrReport(String(donorId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "CSR Report generated",
    data: result,
  });
});

const listDonors = catchAsync(async (req, res) => {
  const { status, page, limit } = req.query;

  const result = await donorsService.listDonors({
    status: status as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Donors retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const donorsController = {
  registerDonor,
  registerCorporateDonor,
  createSubscription,
  getSubscriptions,
  createCommitment,
  getWallet,
  getRecognitions,
  updatePreferences,
  getCsrReport,
  listDonors,
};
