import * as analyticsSnapshot_service from "./analyticsSnapshot.service";
import * as donationAnalytics_service from "./donationAnalytics.service";
import * as campaignAnalytics_service from "./campaignAnalytics.service";
import * as projectAnalytics_service from "./projectAnalytics.service";
import * as volunteerAnalytics_service from "./volunteerAnalytics.service";
import * as beneficiaryAnalytics_service from "./beneficiaryAnalytics.service";
import * as branchAnalytics_service from "./branchAnalytics.service";
import * as financialAnalytics_service from "./financialAnalytics.service";
import * as membershipAnalytics_service from "./membershipAnalytics.service";
import * as userActivityAnalytics_service from "./userActivityAnalytics.service";

export const analyticsMetricsService = {
  ...analyticsSnapshot_service,
  ...donationAnalytics_service,
  ...campaignAnalytics_service,
  ...projectAnalytics_service,
  ...volunteerAnalytics_service,
  ...beneficiaryAnalytics_service,
  ...branchAnalytics_service,
  ...financialAnalytics_service,
  ...membershipAnalytics_service,
  ...userActivityAnalytics_service,
};
