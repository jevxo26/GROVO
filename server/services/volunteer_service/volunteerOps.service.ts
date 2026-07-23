import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createVolunteerAssignment = async (payload: any) => {
  return await prisma.volunteerAssignment.create({
    data: {
      volunteerId: payload.volunteerId,
      campaignId: payload.campaignId,
      projectId: payload.projectId,
      assignedBy: payload.assignedBy,
      assignedRole: payload.assignedRole,
      assignedDate: payload.assignedDate
        ? new Date(payload.assignedDate)
        : undefined,
      status: payload.status,
    },
  });
};

const createVolunteerSchedule = async (payload: any) => {
  return await prisma.volunteerSchedule.create({
    data: {
      volunteerId: payload.volunteerId,
      assignmentId: payload.assignmentId,
      scheduleDate: new Date(payload.scheduleDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      location: payload.location,
      status: payload.status,
    },
  });
};

const createVolunteerAttendance = async (payload: any) => {
  return await prisma.volunteerAttendance.create({
    data: {
      volunteerId: payload.volunteerId,
      scheduleId: payload.scheduleId,
      checkInTime: payload.checkInTime
        ? new Date(payload.checkInTime)
        : undefined,
      checkOutTime: payload.checkOutTime
        ? new Date(payload.checkOutTime)
        : undefined,
      attendanceStatus: payload.attendanceStatus,
      remarks: payload.remarks,
    },
  });
};

const createVolunteerTask = async (payload: any) => {
  return await prisma.volunteerTask.create({
    data: {
      assignmentId: payload.assignmentId,
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      dueDate: new Date(payload.dueDate),
      status: payload.status,
    },
  });
};

const createFieldActivity = async (payload: any) => {
  return await prisma.fieldActivity.create({
    data: {
      projectId: payload.projectId,
      activityTitle: payload.activityTitle,
      activityType: payload.activityType,
      location: payload.location,
      description: payload.description,
      performedBy: payload.performedBy,
      activityDate: payload.activityDate
        ? new Date(payload.activityDate)
        : undefined,
      status: payload.status,
    },
  });
};

const createFieldVisit = async (payload: any) => {
  return await prisma.fieldVisit.create({
    data: {
      activityId: payload.activityId,
      visitedBy: payload.visitedBy,
      divisionId: payload.divisionId,
      districtId: payload.districtId,
      upazilaId: payload.upazilaId,
      unionId: payload.unionId,
      visitDate: payload.visitDate ? new Date(payload.visitDate) : undefined,
      remarks: payload.remarks,
    },
  });
};

const createActivityReport = async (payload: any) => {
  return await prisma.activityReport.create({
    data: {
      activityId: payload.activityId,
      reportTitle: payload.reportTitle,
      summary: payload.summary,
      beneficiariesCount: payload.beneficiariesCount
        ? Number(payload.beneficiariesCount)
        : 0,
      totalExpense: payload.totalExpense ? Number(payload.totalExpense) : 0.0,
      reportFile: payload.reportFile,
      submittedBy: payload.submittedBy,
      approvedBy: payload.approvedBy,
    },
  });
};

const createBeneficiaryVerification = async (payload: any) => {
  return await prisma.beneficiaryVerification.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      verifiedBy: payload.verifiedBy,
      verificationMethod: payload.verificationMethod,
      verificationStatus: payload.verificationStatus,
      remarks: payload.remarks,
    },
  });
};

export const volunteerOpsService = {
  createVolunteerAssignment,
  createVolunteerSchedule,
  createVolunteerAttendance,
  createVolunteerTask,
  createFieldActivity,
  createFieldVisit,
  createActivityReport,
  createBeneficiaryVerification,
};
