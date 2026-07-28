import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 5. VOLUNTEER ASSIGNMENT SERVICES ====================
const createVolunteerAssignment = async (payload: any) => {
  if (!payload.volunteerId || !payload.assignedBy || !payload.assignedRole) {
    throw new customError(status.BAD_REQUEST, "volunteerId, assignedBy, and assignedRole are required.");
  }

  return await prisma.volunteerAssignment.create({
    data: {
      volunteerId: payload.volunteerId,
      campaignId: payload.campaignId || null,
      projectId: payload.projectId || null,
      assignedBy: payload.assignedBy,
      assignedRole: payload.assignedRole,
      assignedDate: payload.assignedDate
        ? new Date(payload.assignedDate)
        : new Date(),
      status: payload.status || "PENDING",
    },
  });
};

const getAllVolunteerAssignments = async (query?: { volunteerId?: string; campaignId?: string; projectId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.projectId) where.projectId = query.projectId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerAssignment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerAssignmentById = async (id: string) => {
  const item = await prisma.volunteerAssignment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer assignment not found.");
  }
  return item;
};

const updateVolunteerAssignment = async (id: string, payload: any) => {
  const item = await prisma.volunteerAssignment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer assignment not found.");
  }

  return await prisma.volunteerAssignment.update({
    where: { id },
    data: {
      ...(payload.campaignId !== undefined && { campaignId: payload.campaignId }),
      ...(payload.projectId !== undefined && { projectId: payload.projectId }),
      ...(payload.assignedBy && { assignedBy: payload.assignedBy }),
      ...(payload.assignedRole && { assignedRole: payload.assignedRole }),
      ...(payload.assignedDate && { assignedDate: new Date(payload.assignedDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerAssignment = async (id: string) => {
  const item = await prisma.volunteerAssignment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer assignment not found.");
  }
  await prisma.volunteerAssignment.delete({ where: { id } });
  return { message: "Volunteer assignment deleted successfully." };
};


// ==================== 6. VOLUNTEER SCHEDULE SERVICES ====================
const createVolunteerSchedule = async (payload: any) => {
  if (!payload.volunteerId || !payload.assignmentId || !payload.scheduleDate || !payload.startTime || !payload.endTime || !payload.location) {
    throw new customError(status.BAD_REQUEST, "volunteerId, assignmentId, scheduleDate, startTime, endTime, and location are required.");
  }

  return await prisma.volunteerSchedule.create({
    data: {
      volunteerId: payload.volunteerId,
      assignmentId: payload.assignmentId,
      scheduleDate: new Date(payload.scheduleDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      location: payload.location,
      status: payload.status || "PENDING",
    },
  });
};

const getAllVolunteerSchedules = async (query?: { volunteerId?: string; assignmentId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.assignmentId) where.assignmentId = query.assignmentId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerSchedule.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerScheduleById = async (id: string) => {
  const item = await prisma.volunteerSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer schedule not found.");
  }
  return item;
};

const updateVolunteerSchedule = async (id: string, payload: any) => {
  const item = await prisma.volunteerSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer schedule not found.");
  }

  return await prisma.volunteerSchedule.update({
    where: { id },
    data: {
      ...(payload.scheduleDate && { scheduleDate: new Date(payload.scheduleDate) }),
      ...(payload.startTime && { startTime: payload.startTime }),
      ...(payload.endTime && { endTime: payload.endTime }),
      ...(payload.location && { location: payload.location }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerSchedule = async (id: string) => {
  const item = await prisma.volunteerSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer schedule not found.");
  }
  await prisma.volunteerSchedule.delete({ where: { id } });
  return { message: "Volunteer schedule deleted successfully." };
};


// ==================== 7. VOLUNTEER ATTENDANCE SERVICES ====================
const createVolunteerAttendance = async (payload: any) => {
  if (!payload.volunteerId || !payload.scheduleId) {
    throw new customError(status.BAD_REQUEST, "volunteerId and scheduleId are required.");
  }

  return await prisma.volunteerAttendance.create({
    data: {
      volunteerId: payload.volunteerId,
      scheduleId: payload.scheduleId,
      checkInTime: payload.checkInTime
        ? new Date(payload.checkInTime)
        : null,
      checkOutTime: payload.checkOutTime
        ? new Date(payload.checkOutTime)
        : null,
      attendanceStatus: payload.attendanceStatus || "PRESENT",
      remarks: payload.remarks || null,
    },
  });
};

const getAllVolunteerAttendances = async (query?: { volunteerId?: string; scheduleId?: string; attendanceStatus?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.scheduleId) where.scheduleId = query.scheduleId;
  if (query?.attendanceStatus) where.attendanceStatus = query.attendanceStatus;

  return await prisma.volunteerAttendance.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerAttendanceById = async (id: string) => {
  const item = await prisma.volunteerAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer attendance record not found.");
  }
  return item;
};

const updateVolunteerAttendance = async (id: string, payload: any) => {
  const item = await prisma.volunteerAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer attendance record not found.");
  }

  return await prisma.volunteerAttendance.update({
    where: { id },
    data: {
      ...(payload.checkInTime && { checkInTime: new Date(payload.checkInTime) }),
      ...(payload.checkOutTime && { checkOutTime: new Date(payload.checkOutTime) }),
      ...(payload.attendanceStatus && { attendanceStatus: payload.attendanceStatus }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

const deleteVolunteerAttendance = async (id: string) => {
  const item = await prisma.volunteerAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer attendance record not found.");
  }
  await prisma.volunteerAttendance.delete({ where: { id } });
  return { message: "Volunteer attendance record deleted successfully." };
};


// ==================== 8. VOLUNTEER TASK SERVICES ====================
const createVolunteerTask = async (payload: any) => {
  if (!payload.assignmentId || !payload.title || !payload.dueDate) {
    throw new customError(status.BAD_REQUEST, "assignmentId, title, and dueDate are required.");
  }

  return await prisma.volunteerTask.create({
    data: {
      assignmentId: payload.assignmentId,
      title: payload.title,
      description: payload.description || null,
      priority: payload.priority || "MEDIUM",
      dueDate: new Date(payload.dueDate),
      completedAt: payload.completedAt ? new Date(payload.completedAt) : null,
      status: payload.status || "PENDING",
    },
  });
};

const getAllVolunteerTasks = async (query?: { assignmentId?: string; priority?: string; status?: string }) => {
  const where: any = {};
  if (query?.assignmentId) where.assignmentId = query.assignmentId;
  if (query?.priority) where.priority = query.priority;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerTask.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerTaskById = async (id: string) => {
  const item = await prisma.volunteerTask.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer task not found.");
  }
  return item;
};

const updateVolunteerTask = async (id: string, payload: any) => {
  const item = await prisma.volunteerTask.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer task not found.");
  }

  return await prisma.volunteerTask.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.priority && { priority: payload.priority }),
      ...(payload.dueDate && { dueDate: new Date(payload.dueDate) }),
      ...(payload.completedAt !== undefined && { completedAt: payload.completedAt ? new Date(payload.completedAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerTask = async (id: string) => {
  const item = await prisma.volunteerTask.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer task not found.");
  }
  await prisma.volunteerTask.delete({ where: { id } });
  return { message: "Volunteer task deleted successfully." };
};


// ==================== 9. FIELD ACTIVITY SERVICES ====================
const createFieldActivity = async (payload: any) => {
  if (!payload.projectId || !payload.activityTitle || !payload.activityType || !payload.location || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "projectId, activityTitle, activityType, location, and performedBy are required.");
  }

  return await prisma.fieldActivity.create({
    data: {
      projectId: payload.projectId,
      activityTitle: payload.activityTitle,
      activityType: payload.activityType,
      location: payload.location,
      description: payload.description || null,
      performedBy: payload.performedBy,
      activityDate: payload.activityDate
        ? new Date(payload.activityDate)
        : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllFieldActivities = async (query?: { projectId?: string; activityType?: string; status?: string }) => {
  const where: any = {};
  if (query?.projectId) where.projectId = query.projectId;
  if (query?.activityType) where.activityType = query.activityType;
  if (query?.status) where.status = query.status;

  return await prisma.fieldActivity.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getFieldActivityById = async (id: string) => {
  const item = await prisma.fieldActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field activity not found.");
  }
  return item;
};

const updateFieldActivity = async (id: string, payload: any) => {
  const item = await prisma.fieldActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field activity not found.");
  }

  return await prisma.fieldActivity.update({
    where: { id },
    data: {
      ...(payload.activityTitle && { activityTitle: payload.activityTitle }),
      ...(payload.activityType && { activityType: payload.activityType }),
      ...(payload.location && { location: payload.location }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.performedBy && { performedBy: payload.performedBy }),
      ...(payload.activityDate && { activityDate: new Date(payload.activityDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteFieldActivity = async (id: string) => {
  const item = await prisma.fieldActivity.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field activity not found.");
  }
  await prisma.fieldActivity.delete({ where: { id } });
  return { message: "Field activity deleted successfully." };
};


// ==================== 10. FIELD VISIT SERVICES ====================
const createFieldVisit = async (payload: any) => {
  if (!payload.activityId || !payload.visitedBy) {
    throw new customError(status.BAD_REQUEST, "activityId and visitedBy are required.");
  }

  return await prisma.fieldVisit.create({
    data: {
      activityId: payload.activityId,
      visitedBy: payload.visitedBy,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      visitDate: payload.visitDate ? new Date(payload.visitDate) : new Date(),
      remarks: payload.remarks || null,
    },
  });
};

const getAllFieldVisits = async (query?: { activityId?: string; visitedBy?: string }) => {
  const where: any = {};
  if (query?.activityId) where.activityId = query.activityId;
  if (query?.visitedBy) where.visitedBy = query.visitedBy;

  return await prisma.fieldVisit.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getFieldVisitById = async (id: string) => {
  const item = await prisma.fieldVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field visit record not found.");
  }
  return item;
};

const updateFieldVisit = async (id: string, payload: any) => {
  const item = await prisma.fieldVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field visit record not found.");
  }

  return await prisma.fieldVisit.update({
    where: { id },
    data: {
      ...(payload.visitedBy && { visitedBy: payload.visitedBy }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.visitDate && { visitDate: new Date(payload.visitDate) }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

const deleteFieldVisit = async (id: string) => {
  const item = await prisma.fieldVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field visit record not found.");
  }
  await prisma.fieldVisit.delete({ where: { id } });
  return { message: "Field visit record deleted successfully." };
};


// ==================== 11. ACTIVITY REPORT SERVICES ====================
const createActivityReport = async (payload: any) => {
  if (!payload.activityId || !payload.reportTitle || !payload.summary || !payload.submittedBy) {
    throw new customError(status.BAD_REQUEST, "activityId, reportTitle, summary, and submittedBy are required.");
  }

  return await prisma.activityReport.create({
    data: {
      activityId: payload.activityId,
      reportTitle: payload.reportTitle,
      summary: payload.summary,
      beneficiariesCount: payload.beneficiariesCount
        ? Number(payload.beneficiariesCount)
        : 0,
      totalExpense: payload.totalExpense ? Number(payload.totalExpense) : 0.0,
      reportFile: payload.reportFile || null,
      submittedBy: payload.submittedBy,
      approvedBy: payload.approvedBy || null,
    },
  });
};

const getAllActivityReports = async (query?: { activityId?: string; submittedBy?: string }) => {
  const where: any = {};
  if (query?.activityId) where.activityId = query.activityId;
  if (query?.submittedBy) where.submittedBy = query.submittedBy;

  return await prisma.activityReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getActivityReportById = async (id: string) => {
  const item = await prisma.activityReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Activity report not found.");
  }
  return item;
};

const updateActivityReport = async (id: string, payload: any) => {
  const item = await prisma.activityReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Activity report not found.");
  }

  return await prisma.activityReport.update({
    where: { id },
    data: {
      ...(payload.reportTitle && { reportTitle: payload.reportTitle }),
      ...(payload.summary && { summary: payload.summary }),
      ...(payload.beneficiariesCount !== undefined && { beneficiariesCount: Number(payload.beneficiariesCount) }),
      ...(payload.totalExpense !== undefined && { totalExpense: Number(payload.totalExpense) }),
      ...(payload.reportFile !== undefined && { reportFile: payload.reportFile }),
      ...(payload.submittedBy && { submittedBy: payload.submittedBy }),
      ...(payload.approvedBy !== undefined && { approvedBy: payload.approvedBy }),
    },
  });
};

const deleteActivityReport = async (id: string) => {
  const item = await prisma.activityReport.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Activity report not found.");
  }
  await prisma.activityReport.delete({ where: { id } });
  return { message: "Activity report deleted successfully." };
};


// ==================== 12. BENEFICIARY VERIFICATION SERVICES ====================
const createBeneficiaryVerification = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.verifiedBy || !payload.verificationMethod) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, verifiedBy, and verificationMethod are required.");
  }

  return await prisma.beneficiaryVerification.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      verifiedBy: payload.verifiedBy,
      verificationMethod: payload.verificationMethod,
      verificationStatus: payload.verificationStatus || "PENDING",
      remarks: payload.remarks || null,
    },
  });
};

const getAllBeneficiaryVerifications = async (query?: { beneficiaryId?: string; verificationStatus?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.verificationStatus) where.verificationStatus = query.verificationStatus;

  return await prisma.beneficiaryVerification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryVerificationById = async (id: string) => {
  const item = await prisma.beneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  return item;
};

const updateBeneficiaryVerification = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }

  return await prisma.beneficiaryVerification.update({
    where: { id },
    data: {
      ...(payload.verifiedBy && { verifiedBy: payload.verifiedBy }),
      ...(payload.verificationMethod && { verificationMethod: payload.verificationMethod }),
      ...(payload.verificationStatus && { verificationStatus: payload.verificationStatus }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

const deleteBeneficiaryVerification = async (id: string) => {
  const item = await prisma.beneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  await prisma.beneficiaryVerification.delete({ where: { id } });
  return { message: "Beneficiary verification record deleted successfully." };
};


export const volunteerOpsService = {
  // VolunteerAssignment
  createVolunteerAssignment,
  getAllVolunteerAssignments,
  getVolunteerAssignmentById,
  updateVolunteerAssignment,
  deleteVolunteerAssignment,
  // VolunteerSchedule
  createVolunteerSchedule,
  getAllVolunteerSchedules,
  getVolunteerScheduleById,
  updateVolunteerSchedule,
  deleteVolunteerSchedule,
  // VolunteerAttendance
  createVolunteerAttendance,
  getAllVolunteerAttendances,
  getVolunteerAttendanceById,
  updateVolunteerAttendance,
  deleteVolunteerAttendance,
  // VolunteerTask
  createVolunteerTask,
  getAllVolunteerTasks,
  getVolunteerTaskById,
  updateVolunteerTask,
  deleteVolunteerTask,
  // FieldActivity
  createFieldActivity,
  getAllFieldActivities,
  getFieldActivityById,
  updateFieldActivity,
  deleteFieldActivity,
  // FieldVisit
  createFieldVisit,
  getAllFieldVisits,
  getFieldVisitById,
  updateFieldVisit,
  deleteFieldVisit,
  // ActivityReport
  createActivityReport,
  getAllActivityReports,
  getActivityReportById,
  updateActivityReport,
  deleteActivityReport,
  // BeneficiaryVerification
  createBeneficiaryVerification,
  getAllBeneficiaryVerifications,
  getBeneficiaryVerificationById,
  updateBeneficiaryVerification,
  deleteBeneficiaryVerification,
};
