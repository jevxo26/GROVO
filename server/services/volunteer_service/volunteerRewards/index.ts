import * as volunteerPerformance_service from "./volunteerPerformance.service";
import * as volunteerReward_service from "./volunteerReward.service";
import * as volunteerCertificatePrimary_service from "./volunteerCertificatePrimary.service";
import * as volunteerCertificateSecondary_service from "./volunteerCertificateSecondary.service";
import * as volunteerExpense_service from "./volunteerExpense.service";
import * as volunteerReimbursementPrimary_service from "./volunteerReimbursementPrimary.service";
import * as volunteerReimbursementSecondary_service from "./volunteerReimbursementSecondary.service";
import * as volunteerAnnouncement_service from "./volunteerAnnouncement.service";
import * as volunteerTraining_service from "./volunteerTraining.service";

export const volunteerRewardsService = {
  ...volunteerPerformance_service,
  ...volunteerReward_service,
  ...volunteerCertificatePrimary_service,
  ...volunteerCertificateSecondary_service,
  ...volunteerExpense_service,
  ...volunteerReimbursementPrimary_service,
  ...volunteerReimbursementSecondary_service,
  ...volunteerAnnouncement_service,
  ...volunteerTraining_service,
};
