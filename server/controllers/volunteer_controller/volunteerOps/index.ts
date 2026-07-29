import * as volunteerAssignment_controller from "./volunteerAssignment.controller";
import * as volunteerSchedule_controller from "./volunteerSchedule.controller";
import * as volunteerAttendance_controller from "./volunteerAttendance.controller";
import * as volunteerTask_controller from "./volunteerTask.controller";
import * as fieldActivity_controller from "./fieldActivity.controller";
import * as fieldVisit_controller from "./fieldVisit.controller";
import * as activityReport_controller from "./activityReport.controller";
import * as beneficiaryVerification_controller from "./beneficiaryVerification.controller";

export const volunteerOpsController = {
  ...volunteerAssignment_controller,
  ...volunteerSchedule_controller,
  ...volunteerAttendance_controller,
  ...volunteerTask_controller,
  ...fieldActivity_controller,
  ...fieldVisit_controller,
  ...activityReport_controller,
  ...beneficiaryVerification_controller,
};
