import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 13. VOLUNTEER PERFORMANCE SERVICES ====================
const createVolunteerPerformance = async (payload: any) => {
  if (!payload.volunteerId) {
    throw new customError(status.BAD_REQUEST, "volunteerId is required.");
  }

  return await prisma.volunteerPerformance.create({
    data: {
      volunteerId: payload.volunteerId,
      totalAssignments: payload.totalAssignments
        ? Number(payload.totalAssignments)
        : 0,
      completedAssignments: payload.completedAssignments
        ? Number(payload.completedAssignments)
        : 0,
      attendanceRate: payload.attendanceRate
        ? Number(payload.attendanceRate)
        : 0.0,
      performanceScore: payload.performanceScore
        ? Number(payload.performanceScore)
        : 0.0,
      rating: payload.rating ? Number(payload.rating) : 0.0,
    },
  });
};

const getAllVolunteerPerformances = async (query?: { volunteerId?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;

  return await prisma.volunteerPerformance.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerPerformanceById = async (id: string) => {
  const item = await prisma.volunteerPerformance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer performance record not found.");
  }
  return item;
};

const updateVolunteerPerformance = async (id: string, payload: any) => {
  const item = await prisma.volunteerPerformance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer performance record not found.");
  }

  return await prisma.volunteerPerformance.update({
    where: { id },
    data: {
      ...(payload.totalAssignments !== undefined && { totalAssignments: Number(payload.totalAssignments) }),
      ...(payload.completedAssignments !== undefined && { completedAssignments: Number(payload.completedAssignments) }),
      ...(payload.attendanceRate !== undefined && { attendanceRate: Number(payload.attendanceRate) }),
      ...(payload.performanceScore !== undefined && { performanceScore: Number(payload.performanceScore) }),
      ...(payload.rating !== undefined && { rating: Number(payload.rating) }),
    },
  });
};

const deleteVolunteerPerformance = async (id: string) => {
  const item = await prisma.volunteerPerformance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer performance record not found.");
  }
  await prisma.volunteerPerformance.delete({ where: { id } });
  return { message: "Volunteer performance record deleted successfully." };
};


// ==================== 14. VOLUNTEER REWARD SERVICES ====================
const createVolunteerReward = async (payload: any) => {
  if (!payload.volunteerId || !payload.title) {
    throw new customError(status.BAD_REQUEST, "volunteerId and title are required.");
  }

  return await prisma.volunteerReward.create({
    data: {
      volunteerId: payload.volunteerId,
      rewardType: payload.rewardType || "APPRECIATION",
      title: payload.title,
      description: payload.description || null,
      rewardDate: payload.rewardDate ? new Date(payload.rewardDate) : new Date(),
    },
  });
};

const getAllVolunteerRewards = async (query?: { volunteerId?: string; rewardType?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.rewardType) where.rewardType = query.rewardType;

  return await prisma.volunteerReward.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerRewardById = async (id: string) => {
  const item = await prisma.volunteerReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reward not found.");
  }
  return item;
};

const updateVolunteerReward = async (id: string, payload: any) => {
  const item = await prisma.volunteerReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reward not found.");
  }

  return await prisma.volunteerReward.update({
    where: { id },
    data: {
      ...(payload.rewardType && { rewardType: payload.rewardType }),
      ...(payload.title && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.rewardDate && { rewardDate: new Date(payload.rewardDate) }),
    },
  });
};

const deleteVolunteerReward = async (id: string) => {
  const item = await prisma.volunteerReward.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reward not found.");
  }
  await prisma.volunteerReward.delete({ where: { id } });
  return { message: "Volunteer reward deleted successfully." };
};


// ==================== 15. VOLUNTEER CERTIFICATE SERVICES ====================
const createVolunteerCertificate = async (payload: any) => {
  if (!payload.volunteerId || !payload.certificateType || !payload.certificateNumber || !payload.certificateUrl) {
    throw new customError(status.BAD_REQUEST, "volunteerId, certificateType, certificateNumber, and certificateUrl are required.");
  }

  const existing = await prisma.volunteerCertificate.findUnique({
    where: { certificateNumber: payload.certificateNumber },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Certificate number '${payload.certificateNumber}' already exists`
    );
  }

  return await prisma.volunteerCertificate.create({
    data: {
      volunteerId: payload.volunteerId,
      certificateType: payload.certificateType,
      certificateNumber: payload.certificateNumber,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : new Date(),
      certificateUrl: payload.certificateUrl,
    },
  });
};

const getAllVolunteerCertificates = async (query?: { volunteerId?: string; certificateType?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.certificateType) where.certificateType = query.certificateType;

  return await prisma.volunteerCertificate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerCertificateById = async (id: string) => {
  const item = await prisma.volunteerCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer certificate not found.");
  }
  return item;
};

const updateVolunteerCertificate = async (id: string, payload: any) => {
  const item = await prisma.volunteerCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer certificate not found.");
  }

  if (payload.certificateNumber && payload.certificateNumber !== item.certificateNumber) {
    const existing = await prisma.volunteerCertificate.findUnique({ where: { certificateNumber: payload.certificateNumber } });
    if (existing) {
      throw new customError(status.CONFLICT, `Certificate number '${payload.certificateNumber}' already exists`);
    }
  }

  return await prisma.volunteerCertificate.update({
    where: { id },
    data: {
      ...(payload.certificateType && { certificateType: payload.certificateType }),
      ...(payload.certificateNumber && { certificateNumber: payload.certificateNumber }),
      ...(payload.issueDate && { issueDate: new Date(payload.issueDate) }),
      ...(payload.certificateUrl && { certificateUrl: payload.certificateUrl }),
    },
  });
};

const deleteVolunteerCertificate = async (id: string) => {
  const item = await prisma.volunteerCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer certificate not found.");
  }
  await prisma.volunteerCertificate.delete({ where: { id } });
  return { message: "Volunteer certificate deleted successfully." };
};


// ==================== 16. VOLUNTEER EXPENSE SERVICES ====================
const createVolunteerExpense = async (payload: any) => {
  if (!payload.volunteerId || !payload.activityId || !payload.expenseType || payload.amount === undefined) {
    throw new customError(status.BAD_REQUEST, "volunteerId, activityId, expenseType, and amount are required.");
  }

  return await prisma.volunteerExpense.create({
    data: {
      volunteerId: payload.volunteerId,
      activityId: payload.activityId,
      expenseType: payload.expenseType,
      amount: Number(payload.amount),
      description: payload.description || null,
      receiptUrl: payload.receiptUrl || null,
      status: payload.status || "PENDING",
    },
  });
};

const getAllVolunteerExpenses = async (query?: { volunteerId?: string; activityId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.activityId) where.activityId = query.activityId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerExpense.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerExpenseById = async (id: string) => {
  const item = await prisma.volunteerExpense.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer expense record not found.");
  }
  return item;
};

const updateVolunteerExpense = async (id: string, payload: any) => {
  const item = await prisma.volunteerExpense.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer expense record not found.");
  }

  return await prisma.volunteerExpense.update({
    where: { id },
    data: {
      ...(payload.expenseType && { expenseType: payload.expenseType }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.receiptUrl !== undefined && { receiptUrl: payload.receiptUrl }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerExpense = async (id: string) => {
  const item = await prisma.volunteerExpense.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer expense record not found.");
  }
  await prisma.volunteerExpense.delete({ where: { id } });
  return { message: "Volunteer expense record deleted successfully." };
};


// ==================== 17. VOLUNTEER REIMBURSEMENT SERVICES ====================
const createVolunteerReimbursement = async (payload: any) => {
  if (!payload.expenseId || payload.approvedAmount === undefined || !payload.approvedBy || !payload.paymentMethod) {
    throw new customError(status.BAD_REQUEST, "expenseId, approvedAmount, approvedBy, and paymentMethod are required.");
  }

  const existing = await prisma.volunteerReimbursement.findUnique({
    where: { expenseId: payload.expenseId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Reimbursement already exists for this expense"
    );
  }

  return await prisma.volunteerReimbursement.create({
    data: {
      expenseId: payload.expenseId,
      approvedAmount: Number(payload.approvedAmount),
      approvedBy: payload.approvedBy,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentStatus || "PENDING",
      paidAt: payload.paidAt ? new Date(payload.paidAt) : null,
    },
  });
};

const getAllVolunteerReimbursements = async (query?: { paymentStatus?: string; approvedBy?: string }) => {
  const where: any = {};
  if (query?.paymentStatus) where.paymentStatus = query.paymentStatus;
  if (query?.approvedBy) where.approvedBy = query.approvedBy;

  return await prisma.volunteerReimbursement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerReimbursementById = async (id: string) => {
  const item = await prisma.volunteerReimbursement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reimbursement record not found.");
  }
  return item;
};

const updateVolunteerReimbursement = async (id: string, payload: any) => {
  const item = await prisma.volunteerReimbursement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reimbursement record not found.");
  }

  return await prisma.volunteerReimbursement.update({
    where: { id },
    data: {
      ...(payload.approvedAmount !== undefined && { approvedAmount: Number(payload.approvedAmount) }),
      ...(payload.approvedBy && { approvedBy: payload.approvedBy }),
      ...(payload.paymentMethod && { paymentMethod: payload.paymentMethod }),
      ...(payload.paymentStatus && { paymentStatus: payload.paymentStatus }),
      ...(payload.paidAt !== undefined && { paidAt: payload.paidAt ? new Date(payload.paidAt) : null }),
    },
  });
};

const deleteVolunteerReimbursement = async (id: string) => {
  const item = await prisma.volunteerReimbursement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reimbursement record not found.");
  }
  await prisma.volunteerReimbursement.delete({ where: { id } });
  return { message: "Volunteer reimbursement record deleted successfully." };
};


// ==================== 18. VOLUNTEER ANNOUNCEMENT SERVICES ====================
const createVolunteerAnnouncement = async (payload: any) => {
  if (!payload.title || !payload.description || !payload.startDate || !payload.endDate || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, description, startDate, endDate, and publishedBy are required.");
  }

  return await prisma.volunteerAnnouncement.create({
    data: {
      title: payload.title,
      description: payload.description,
      targetGroup: payload.targetGroup || null,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      publishedBy: payload.publishedBy,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllVolunteerAnnouncements = async (query?: { targetGroup?: string; status?: string }) => {
  const where: any = {};
  if (query?.targetGroup) where.targetGroup = query.targetGroup;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerAnnouncement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerAnnouncementById = async (id: string) => {
  const item = await prisma.volunteerAnnouncement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer announcement not found.");
  }
  return item;
};

const updateVolunteerAnnouncement = async (id: string, payload: any) => {
  const item = await prisma.volunteerAnnouncement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer announcement not found.");
  }

  return await prisma.volunteerAnnouncement.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.description && { description: payload.description }),
      ...(payload.targetGroup !== undefined && { targetGroup: payload.targetGroup }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate && { endDate: new Date(payload.endDate) }),
      ...(payload.publishedBy && { publishedBy: payload.publishedBy }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerAnnouncement = async (id: string) => {
  const item = await prisma.volunteerAnnouncement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer announcement not found.");
  }
  await prisma.volunteerAnnouncement.delete({ where: { id } });
  return { message: "Volunteer announcement deleted successfully." };
};


// ==================== 19. VOLUNTEER TRAINING SERVICES ====================
const createVolunteerTraining = async (payload: any) => {
  if (!payload.trainingTitle || !payload.trainer || !payload.trainingDate || !payload.location) {
    throw new customError(status.BAD_REQUEST, "trainingTitle, trainer, trainingDate, and location are required.");
  }

  return await prisma.volunteerTraining.create({
    data: {
      trainingTitle: payload.trainingTitle,
      description: payload.description || null,
      trainer: payload.trainer,
      trainingDate: new Date(payload.trainingDate),
      location: payload.location,
      certificateAvailable: Boolean(payload.certificateAvailable),
      status: payload.status || "PENDING",
    },
  });
};

const getAllVolunteerTrainings = async (query?: { trainer?: string; status?: string }) => {
  const where: any = {};
  if (query?.trainer) where.trainer = query.trainer;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerTraining.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerTrainingById = async (id: string) => {
  const item = await prisma.volunteerTraining.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer training not found.");
  }
  return item;
};

const updateVolunteerTraining = async (id: string, payload: any) => {
  const item = await prisma.volunteerTraining.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer training not found.");
  }

  return await prisma.volunteerTraining.update({
    where: { id },
    data: {
      ...(payload.trainingTitle && { trainingTitle: payload.trainingTitle }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.trainer && { trainer: payload.trainer }),
      ...(payload.trainingDate && { trainingDate: new Date(payload.trainingDate) }),
      ...(payload.location && { location: payload.location }),
      ...(payload.certificateAvailable !== undefined && { certificateAvailable: Boolean(payload.certificateAvailable) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerTraining = async (id: string) => {
  const item = await prisma.volunteerTraining.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer training not found.");
  }
  await prisma.volunteerTraining.delete({ where: { id } });
  return { message: "Volunteer training deleted successfully." };
};


export const volunteerRewardsService = {
  // VolunteerPerformance
  createVolunteerPerformance,
  getAllVolunteerPerformances,
  getVolunteerPerformanceById,
  updateVolunteerPerformance,
  deleteVolunteerPerformance,
  // VolunteerReward
  createVolunteerReward,
  getAllVolunteerRewards,
  getVolunteerRewardById,
  updateVolunteerReward,
  deleteVolunteerReward,
  // VolunteerCertificate
  createVolunteerCertificate,
  getAllVolunteerCertificates,
  getVolunteerCertificateById,
  updateVolunteerCertificate,
  deleteVolunteerCertificate,
  // VolunteerExpense
  createVolunteerExpense,
  getAllVolunteerExpenses,
  getVolunteerExpenseById,
  updateVolunteerExpense,
  deleteVolunteerExpense,
  // VolunteerReimbursement
  createVolunteerReimbursement,
  getAllVolunteerReimbursements,
  getVolunteerReimbursementById,
  updateVolunteerReimbursement,
  deleteVolunteerReimbursement,
  // VolunteerAnnouncement
  createVolunteerAnnouncement,
  getAllVolunteerAnnouncements,
  getVolunteerAnnouncementById,
  updateVolunteerAnnouncement,
  deleteVolunteerAnnouncement,
  // VolunteerTraining
  createVolunteerTraining,
  getAllVolunteerTrainings,
  getVolunteerTrainingById,
  updateVolunteerTraining,
  deleteVolunteerTraining,
};
