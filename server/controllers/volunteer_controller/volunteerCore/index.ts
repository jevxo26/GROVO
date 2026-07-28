import * as volunteer_controller from "./volunteer.controller";
import * as volunteerProfile_controller from "./volunteerProfile.controller";
import * as volunteerSkill_controller from "./volunteerSkill.controller";
import * as volunteerAvailability_controller from "./volunteerAvailability.controller";
import * as volunteerDocument_controller from "./volunteerDocument.controller";
import * as volunteerActivityLog_controller from "./volunteerActivityLog.controller";

export const volunteerCoreController = {
  ...volunteer_controller,
  ...volunteerProfile_controller,
  ...volunteerSkill_controller,
  ...volunteerAvailability_controller,
  ...volunteerDocument_controller,
  ...volunteerActivityLog_controller,
};
