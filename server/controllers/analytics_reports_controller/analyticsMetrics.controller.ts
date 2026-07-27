import { Request, Response } from "express";
import { AnalyticsMetricsService } from "../../services/analytics_reports_service/analyticsMetrics.service";

const createAnalyticsSnapshot = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createAnalyticsSnapshot(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Analytics snapshot recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDonationAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createDonationAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Donation analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCampaignAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createCampaignAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Campaign analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProjectAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createProjectAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Project analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createVolunteerAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createVolunteerAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Volunteer analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBeneficiaryAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createBeneficiaryAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Beneficiary analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBranchAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createBranchAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Branch analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createFinancialAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createFinancialAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Financial analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createMembershipAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createMembershipAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Membership analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createUserActivityAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticsMetricsService.createUserActivityAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "User activity analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const AnalyticsMetricsController = {
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
