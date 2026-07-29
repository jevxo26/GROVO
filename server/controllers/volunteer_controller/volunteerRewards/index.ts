import * as volunteerPerformance_controller from "./volunteerPerformance.controller";
import * as volunteerReward_controller from "./volunteerReward.controller";
import * as volunteerCertificate_controller from "./volunteerCertificate.controller";
import * as volunteerExpense_controller from "./volunteerExpense.controller";
import * as volunteerReimbursement_controller from "./volunteerReimbursement.controller";
import * as volunteerAnnouncement_controller from "./volunteerAnnouncement.controller";
import * as volunteerTraining_controller from "./volunteerTraining.controller";

export const volunteerRewardsController = {
  ...volunteerPerformance_controller,
  ...volunteerReward_controller,
  ...volunteerCertificate_controller,
  ...volunteerExpense_controller,
  ...volunteerReimbursement_controller,
  ...volunteerAnnouncement_controller,
  ...volunteerTraining_controller,
};
