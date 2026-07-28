import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 13. DISTRIBUTION RECORD SERVICES ====================
const createDistributionRecord = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.distributionCampaignId || !payload.packageId || !payload.distributedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, distributionCampaignId, packageId, and distributedBy are required.");
  }

  return await prisma.distributionRecord.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      distributionCampaignId: payload.distributionCampaignId,
      packageId: payload.packageId,
      distributedBy: payload.distributedBy,
      receivedAt: payload.receivedAt ? new Date(payload.receivedAt) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDistributionRecords = async (query?: { beneficiaryId?: string; distributionCampaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.distributionCampaignId) where.distributionCampaignId = query.distributionCampaignId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionRecord.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDistributionRecordById = async (id: string) => {
  const item = await prisma.distributionRecord.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution record not found.");
  }
  return item;
};

const updateDistributionRecord = async (id: string, payload: any) => {
  const item = await prisma.distributionRecord.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution record not found.");
  }

  return await prisma.distributionRecord.update({
    where: { id },
    data: {
      ...(payload.beneficiaryId && { beneficiaryId: payload.beneficiaryId }),
      ...(payload.distributionCampaignId && { distributionCampaignId: payload.distributionCampaignId }),
      ...(payload.packageId && { packageId: payload.packageId }),
      ...(payload.distributedBy && { distributedBy: payload.distributedBy }),
      ...(payload.receivedAt && { receivedAt: new Date(payload.receivedAt) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDistributionRecord = async (id: string) => {
  const item = await prisma.distributionRecord.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution record not found.");
  }
  await prisma.distributionRecord.delete({ where: { id } });
  return { message: "Distribution record deleted successfully." };
};


// ==================== 14. DISTRIBUTION ITEM SERVICES ====================
const createDistributionItem = async (payload: any) => {
  if (!payload.distributionRecordId || !payload.reliefItemId || payload.quantity === undefined) {
    throw new customError(status.BAD_REQUEST, "distributionRecordId, reliefItemId, and quantity are required.");
  }

  return await prisma.distributionItem.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      reliefItemId: payload.reliefItemId,
      quantity: Number(payload.quantity),
      remarks: payload.remarks || null,
    },
  });
};

const getAllDistributionItems = async (query?: { distributionRecordId?: string; reliefItemId?: string }) => {
  const where: any = {};
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;
  if (query?.reliefItemId) where.reliefItemId = query.reliefItemId;

  return await prisma.distributionItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDistributionItemById = async (id: string) => {
  const item = await prisma.distributionItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution item not found.");
  }
  return item;
};

const updateDistributionItem = async (id: string, payload: any) => {
  const item = await prisma.distributionItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution item not found.");
  }

  return await prisma.distributionItem.update({
    where: { id },
    data: {
      ...(payload.reliefItemId && { reliefItemId: payload.reliefItemId }),
      ...(payload.quantity !== undefined && { quantity: Number(payload.quantity) }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

const deleteDistributionItem = async (id: string) => {
  const item = await prisma.distributionItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution item not found.");
  }
  await prisma.distributionItem.delete({ where: { id } });
  return { message: "Distribution item deleted successfully." };
};


// ==================== 16. DISTRIBUTION VERIFICATION SERVICES ====================
const createDistributionVerification = async (payload: any) => {
  if (!payload.distributionRecordId || !payload.verifiedBy) {
    throw new customError(status.BAD_REQUEST, "distributionRecordId and verifiedBy are required.");
  }

  return await prisma.distributionVerification.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      verificationMethod: payload.verificationMethod || "QR_CODE",
      verifiedBy: payload.verifiedBy,
      verificationTime: payload.verificationTime
        ? new Date(payload.verificationTime)
        : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDistributionVerifications = async (query?: { distributionRecordId?: string; status?: string }) => {
  const where: any = {};
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionVerification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDistributionVerificationById = async (id: string) => {
  const item = await prisma.distributionVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution verification record not found.");
  }
  return item;
};

const updateDistributionVerification = async (id: string, payload: any) => {
  const item = await prisma.distributionVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution verification record not found.");
  }

  return await prisma.distributionVerification.update({
    where: { id },
    data: {
      ...(payload.verificationMethod && { verificationMethod: payload.verificationMethod }),
      ...(payload.verifiedBy && { verifiedBy: payload.verifiedBy }),
      ...(payload.verificationTime && { verificationTime: new Date(payload.verificationTime) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDistributionVerification = async (id: string) => {
  const item = await prisma.distributionVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution verification record not found.");
  }
  await prisma.distributionVerification.delete({ where: { id } });
  return { message: "Distribution verification record deleted successfully." };
};


// ==================== 17. ACKNOWLEDGEMENT SERVICES ====================
const createAcknowledgement = async (payload: any) => {
  if (!payload.distributionRecordId) {
    throw new customError(status.BAD_REQUEST, "distributionRecordId is required.");
  }

  const existing = await prisma.acknowledgement.findUnique({
    where: { distributionRecordId: payload.distributionRecordId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Acknowledgement already exists for this distribution record.");
  }

  return await prisma.acknowledgement.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      signature: payload.signature || null,
      photo: payload.photo || null,
      remarks: payload.remarks || null,
    },
  });
};

const getAllAcknowledgements = async (query?: { distributionRecordId?: string }) => {
  const where: any = {};
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;

  return await prisma.acknowledgement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getAcknowledgementById = async (id: string) => {
  const item = await prisma.acknowledgement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Acknowledgement not found.");
  }
  return item;
};

const updateAcknowledgement = async (id: string, payload: any) => {
  const item = await prisma.acknowledgement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Acknowledgement not found.");
  }

  return await prisma.acknowledgement.update({
    where: { id },
    data: {
      ...(payload.signature !== undefined && { signature: payload.signature }),
      ...(payload.photo !== undefined && { photo: payload.photo }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

const deleteAcknowledgement = async (id: string) => {
  const item = await prisma.acknowledgement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Acknowledgement not found.");
  }
  await prisma.acknowledgement.delete({ where: { id } });
  return { message: "Acknowledgement deleted successfully." };
};


// ==================== 18. BENEFICIARY FEEDBACK SERVICES ====================
const createBeneficiaryFeedback = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.feedback) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId and feedback are required.");
  }

  return await prisma.beneficiaryFeedback.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      distributionRecordId: payload.distributionRecordId || null,
      rating: payload.rating ? Number(payload.rating) : 5,
      feedback: payload.feedback,
      submittedAt: payload.submittedAt
        ? new Date(payload.submittedAt)
        : new Date(),
    },
  });
};

const getAllBeneficiaryFeedbacks = async (query?: { beneficiaryId?: string; distributionRecordId?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;

  return await prisma.beneficiaryFeedback.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryFeedbackById = async (id: string) => {
  const item = await prisma.beneficiaryFeedback.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary feedback not found.");
  }
  return item;
};

const updateBeneficiaryFeedback = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryFeedback.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary feedback not found.");
  }

  return await prisma.beneficiaryFeedback.update({
    where: { id },
    data: {
      ...(payload.rating !== undefined && { rating: Number(payload.rating) }),
      ...(payload.feedback && { feedback: payload.feedback }),
    },
  });
};

const deleteBeneficiaryFeedback = async (id: string) => {
  const item = await prisma.beneficiaryFeedback.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary feedback not found.");
  }
  await prisma.beneficiaryFeedback.delete({ where: { id } });
  return { message: "Beneficiary feedback deleted successfully." };
};


// ==================== 19. FOLLOW UP VISIT SERVICES ====================
const createFollowUpVisit = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.visitedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId and visitedBy are required.");
  }

  return await prisma.followUpVisit.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      visitedBy: payload.visitedBy,
      visitDate: payload.visitDate ? new Date(payload.visitDate) : new Date(),
      remarks: payload.remarks || null,
      nextVisitDate: payload.nextVisitDate
        ? new Date(payload.nextVisitDate)
        : null,
      status: payload.status || "PENDING",
    },
  });
};

const getAllFollowUpVisits = async (query?: { beneficiaryId?: string; visitedBy?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.visitedBy) where.visitedBy = query.visitedBy;
  if (query?.status) where.status = query.status;

  return await prisma.followUpVisit.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getFollowUpVisitById = async (id: string) => {
  const item = await prisma.followUpVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Follow-up visit not found.");
  }
  return item;
};

const updateFollowUpVisit = async (id: string, payload: any) => {
  const item = await prisma.followUpVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Follow-up visit not found.");
  }

  return await prisma.followUpVisit.update({
    where: { id },
    data: {
      ...(payload.visitedBy && { visitedBy: payload.visitedBy }),
      ...(payload.visitDate && { visitDate: new Date(payload.visitDate) }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
      ...(payload.nextVisitDate !== undefined && { nextVisitDate: payload.nextVisitDate ? new Date(payload.nextVisitDate) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteFollowUpVisit = async (id: string) => {
  const item = await prisma.followUpVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Follow-up visit not found.");
  }
  await prisma.followUpVisit.delete({ where: { id } });
  return { message: "Follow-up visit deleted successfully." };
};


// ==================== 20. CASE HISTORY SERVICES ====================
const createCaseHistory = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.caseType || !payload.description || !payload.assignedOfficer) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, caseType, description, and assignedOfficer are required.");
  }

  return await prisma.caseHistory.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      caseType: payload.caseType,
      description: payload.description,
      assignedOfficer: payload.assignedOfficer,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllCaseHistories = async (query?: { beneficiaryId?: string; caseType?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.caseType) where.caseType = query.caseType;
  if (query?.status) where.status = query.status;

  return await prisma.caseHistory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getCaseHistoryById = async (id: string) => {
  const item = await prisma.caseHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Case history not found.");
  }
  return item;
};

const updateCaseHistory = async (id: string, payload: any) => {
  const item = await prisma.caseHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Case history not found.");
  }

  return await prisma.caseHistory.update({
    where: { id },
    data: {
      ...(payload.caseType && { caseType: payload.caseType }),
      ...(payload.description && { description: payload.description }),
      ...(payload.assignedOfficer && { assignedOfficer: payload.assignedOfficer }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteCaseHistory = async (id: string) => {
  const item = await prisma.caseHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Case history not found.");
  }
  await prisma.caseHistory.delete({ where: { id } });
  return { message: "Case history deleted successfully." };
};


// ==================== 21. BENEFICIARY ACTIVITY LOG SERVICES ====================
const createBeneficiaryActivityLog = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.activity || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, activity, and performedBy are required.");
  }

  return await prisma.beneficiaryActivityLog.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      activity: payload.activity,
      description: payload.description || null,
      performedBy: payload.performedBy,
    },
  });
};

const getAllBeneficiaryActivityLogs = async (query?: { beneficiaryId?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;

  return await prisma.beneficiaryActivityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryActivityLogById = async (id: string) => {
  const item = await prisma.beneficiaryActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary activity log not found.");
  }
  return item;
};

const deleteBeneficiaryActivityLog = async (id: string) => {
  const item = await prisma.beneficiaryActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary activity log not found.");
  }
  await prisma.beneficiaryActivityLog.delete({ where: { id } });
  return { message: "Beneficiary activity log deleted successfully." };
};


export const beneficiaryDistributionService = {
  // DistributionRecord
  createDistributionRecord,
  getAllDistributionRecords,
  getDistributionRecordById,
  updateDistributionRecord,
  deleteDistributionRecord,
  // DistributionItem
  createDistributionItem,
  getAllDistributionItems,
  getDistributionItemById,
  updateDistributionItem,
  deleteDistributionItem,
  // DistributionVerification
  createDistributionVerification,
  getAllDistributionVerifications,
  getDistributionVerificationById,
  updateDistributionVerification,
  deleteDistributionVerification,
  // Acknowledgement
  createAcknowledgement,
  getAllAcknowledgements,
  getAcknowledgementById,
  updateAcknowledgement,
  deleteAcknowledgement,
  // BeneficiaryFeedback
  createBeneficiaryFeedback,
  getAllBeneficiaryFeedbacks,
  getBeneficiaryFeedbackById,
  updateBeneficiaryFeedback,
  deleteBeneficiaryFeedback,
  // FollowUpVisit
  createFollowUpVisit,
  getAllFollowUpVisits,
  getFollowUpVisitById,
  updateFollowUpVisit,
  deleteFollowUpVisit,
  // CaseHistory
  createCaseHistory,
  getAllCaseHistories,
  getCaseHistoryById,
  updateCaseHistory,
  deleteCaseHistory,
  // BeneficiaryActivityLog
  createBeneficiaryActivityLog,
  getAllBeneficiaryActivityLogs,
  getBeneficiaryActivityLogById,
  deleteBeneficiaryActivityLog,
};
