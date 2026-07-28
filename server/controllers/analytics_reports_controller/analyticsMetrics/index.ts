import * as analyticsSnapshot_controller from "./analyticsSnapshot.controller";
import * as donationAnalytics_controller from "./donationAnalytics.controller";
import * as campaignAnalytics_controller from "./campaignAnalytics.controller";
import * as projectAnalytics_controller from "./projectAnalytics.controller";
import * as volunteerAnalytics_controller from "./volunteerAnalytics.controller";
import * as beneficiaryAnalytics_controller from "./beneficiaryAnalytics.controller";
import * as branchAnalytics_controller from "./branchAnalytics.controller";
import * as financialAnalytics_controller from "./financialAnalytics.controller";
import * as membershipAnalytics_controller from "./membershipAnalytics.controller";
import * as userActivityAnalytics_controller from "./userActivityAnalytics.controller";

export const analyticsMetricsController = {
  ...analyticsSnapshot_controller,
  ...donationAnalytics_controller,
  ...campaignAnalytics_controller,
  ...projectAnalytics_controller,
  ...volunteerAnalytics_controller,
  ...beneficiaryAnalytics_controller,
  ...branchAnalytics_controller,
  ...financialAnalytics_controller,
  ...membershipAnalytics_controller,
  ...userActivityAnalytics_controller,
};
