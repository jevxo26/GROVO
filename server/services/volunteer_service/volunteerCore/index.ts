import * as volunteerPrimary_service from "./volunteerPrimary.service";
import * as volunteerSecondary_service from "./volunteerSecondary.service";
import * as volunteerProfilePrimary_service from "./volunteerProfilePrimary.service";
import * as volunteerProfileSecondary_service from "./volunteerProfileSecondary.service";
import * as volunteerSkill_service from "./volunteerSkill.service";
import * as volunteerAvailability_service from "./volunteerAvailability.service";
import * as volunteerDocument_service from "./volunteerDocument.service";
import * as volunteerActivityLog_service from "./volunteerActivityLog.service";

export const volunteerCoreService = {
  ...volunteerPrimary_service,
  ...volunteerSecondary_service,
  ...volunteerProfilePrimary_service,
  ...volunteerProfileSecondary_service,
  ...volunteerSkill_service,
  ...volunteerAvailability_service,
  ...volunteerDocument_service,
  ...volunteerActivityLog_service,
};
