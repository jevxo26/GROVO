import * as volunteerAssignment_service from "./volunteerAssignment.service";
import * as volunteerSchedule_service from "./volunteerSchedule.service";
import * as volunteerAttendance_service from "./volunteerAttendance.service";
import * as volunteerTask_service from "./volunteerTask.service";
import * as fieldActivity_service from "./fieldActivity.service";
import * as fieldVisit_service from "./fieldVisit.service";
import * as activityReport_service from "./activityReport.service";
import * as beneficiaryVerification_service from "./beneficiaryVerification.service";

export const volunteerOpsService = {
  ...volunteerAssignment_service,
  ...volunteerSchedule_service,
  ...volunteerAttendance_service,
  ...volunteerTask_service,
  ...fieldActivity_service,
  ...fieldVisit_service,
  ...activityReport_service,
  ...beneficiaryVerification_service,
};
