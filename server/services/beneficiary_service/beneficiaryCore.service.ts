import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 1. BENEFICIARY SERVICES ====================
const createBeneficiary = async (payload: any) => {
  if (!payload.beneficiaryCode || !payload.fullName) {
    throw new customError(status.BAD_REQUEST, "beneficiaryCode and fullName are required.");
  }

  const existingCode = await prisma.beneficiary.findUnique({
    where: { beneficiaryCode: payload.beneficiaryCode },
  });
  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Beneficiary code '${payload.beneficiaryCode}' already exists`
    );
  }

  if (payload.nationalId) {
    const existingNid = await prisma.beneficiary.findUnique({
      where: { nationalId: payload.nationalId },
    });
    if (existingNid) {
      throw new customError(
        status.CONFLICT,
        `National ID '${payload.nationalId}' already exists`
      );
    }
  }

  return await prisma.beneficiary.create({
    data: {
      beneficiaryCode: payload.beneficiaryCode,
      fullName: payload.fullName,
      phone: payload.phone || null,
      nationalId: payload.nationalId || null,
      dateOfBirth: payload.dateOfBirth
        ? new Date(payload.dateOfBirth)
        : null,
      gender: payload.gender || "MALE",
      branchId: payload.branchId || null,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      address: payload.address || null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllBeneficiaries = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { beneficiaryCode: { contains: query.search, mode: "insensitive" } },
      { fullName: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.beneficiary.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryById = async (id: string) => {
  const item = await prisma.beneficiary.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary not found.");
  }
  return item;
};

const updateBeneficiary = async (id: string, payload: any) => {
  const item = await prisma.beneficiary.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary not found.");
  }

  if (payload.beneficiaryCode && payload.beneficiaryCode !== item.beneficiaryCode) {
    const existing = await prisma.beneficiary.findUnique({ where: { beneficiaryCode: payload.beneficiaryCode } });
    if (existing) {
      throw new customError(status.CONFLICT, `Beneficiary code '${payload.beneficiaryCode}' already exists`);
    }
  }

  return await prisma.beneficiary.update({
    where: { id },
    data: {
      ...(payload.beneficiaryCode && { beneficiaryCode: payload.beneficiaryCode }),
      ...(payload.fullName && { fullName: payload.fullName }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.nationalId !== undefined && { nationalId: payload.nationalId }),
      ...(payload.dateOfBirth !== undefined && { dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : null }),
      ...(payload.gender && { gender: payload.gender }),
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.address !== undefined && { address: payload.address }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteBeneficiary = async (id: string) => {
  const item = await prisma.beneficiary.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary not found.");
  }
  await prisma.beneficiary.delete({ where: { id } });
  return { message: "Beneficiary deleted successfully." };
};


// ==================== 2. BENEFICIARY PROFILE SERVICES ====================
const createBeneficiaryProfile = async (payload: any) => {
  if (!payload.beneficiaryId) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId is required.");
  }

  const existing = await prisma.beneficiaryProfile.findUnique({
    where: { beneficiaryId: payload.beneficiaryId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Profile already exists for this beneficiary"
    );
  }

  return await prisma.beneficiaryProfile.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      occupation: payload.occupation || null,
      monthlyIncome: payload.monthlyIncome
        ? Number(payload.monthlyIncome)
        : 0.0,
      familySize: payload.familySize ? Number(payload.familySize) : 1,
      houseType: payload.houseType || null,
      education: payload.education || null,
      healthCondition: payload.healthCondition || null,
      specialNeeds: payload.specialNeeds || null,
    },
  });
};

const getAllBeneficiaryProfiles = async (query?: { houseType?: string; education?: string }) => {
  const where: any = {};
  if (query?.houseType) where.houseType = query.houseType;
  if (query?.education) where.education = query.education;

  return await prisma.beneficiaryProfile.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryProfileById = async (id: string) => {
  const item = await prisma.beneficiaryProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary profile not found.");
  }
  return item;
};

const updateBeneficiaryProfile = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary profile not found.");
  }

  return await prisma.beneficiaryProfile.update({
    where: { id },
    data: {
      ...(payload.occupation !== undefined && { occupation: payload.occupation }),
      ...(payload.monthlyIncome !== undefined && { monthlyIncome: Number(payload.monthlyIncome) }),
      ...(payload.familySize !== undefined && { familySize: Number(payload.familySize) }),
      ...(payload.houseType !== undefined && { houseType: payload.houseType }),
      ...(payload.education !== undefined && { education: payload.education }),
      ...(payload.healthCondition !== undefined && { healthCondition: payload.healthCondition }),
      ...(payload.specialNeeds !== undefined && { specialNeeds: payload.specialNeeds }),
    },
  });
};

const deleteBeneficiaryProfile = async (id: string) => {
  const item = await prisma.beneficiaryProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary profile not found.");
  }
  await prisma.beneficiaryProfile.delete({ where: { id } });
  return { message: "Beneficiary profile deleted successfully." };
};


// ==================== 3. FAMILY MEMBER SERVICES ====================
const createFamilyMember = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.name || !payload.relationship) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, name, and relationship are required.");
  }

  return await prisma.familyMember.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      name: payload.name,
      relationship: payload.relationship,
      age: payload.age ? Number(payload.age) : null,
      occupation: payload.occupation || null,
      monthlyIncome: payload.monthlyIncome
        ? Number(payload.monthlyIncome)
        : 0.0,
    },
  });
};

const getAllFamilyMembers = async (query?: { beneficiaryId?: string; relationship?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.relationship) where.relationship = query.relationship;

  return await prisma.familyMember.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getFamilyMemberById = async (id: string) => {
  const item = await prisma.familyMember.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Family member record not found.");
  }
  return item;
};

const updateFamilyMember = async (id: string, payload: any) => {
  const item = await prisma.familyMember.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Family member record not found.");
  }

  return await prisma.familyMember.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.relationship && { relationship: payload.relationship }),
      ...(payload.age !== undefined && { age: payload.age ? Number(payload.age) : null }),
      ...(payload.occupation !== undefined && { occupation: payload.occupation }),
      ...(payload.monthlyIncome !== undefined && { monthlyIncome: Number(payload.monthlyIncome) }),
    },
  });
};

const deleteFamilyMember = async (id: string) => {
  const item = await prisma.familyMember.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Family member record not found.");
  }
  await prisma.familyMember.delete({ where: { id } });
  return { message: "Family member record deleted successfully." };
};


// ==================== 4. BENEFICIARY CATEGORY SERVICES ====================
const createBeneficiaryCategory = async (payload: any) => {
  if (!payload.categoryName) {
    throw new customError(status.BAD_REQUEST, "categoryName is required.");
  }

  const existing = await prisma.beneficiaryCategory.findUnique({
    where: { categoryName: payload.categoryName },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Category '${payload.categoryName}' already exists`);
  }

  return await prisma.beneficiaryCategory.create({
    data: {
      categoryName: payload.categoryName,
      description: payload.description || null,
      priorityLevel: payload.priorityLevel || "MEDIUM",
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllBeneficiaryCategories = async (query?: { priorityLevel?: string; status?: string }) => {
  const where: any = {};
  if (query?.priorityLevel) where.priorityLevel = query.priorityLevel;
  if (query?.status) where.status = query.status;

  return await prisma.beneficiaryCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryCategoryById = async (id: string) => {
  const item = await prisma.beneficiaryCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary category not found.");
  }
  return item;
};

const updateBeneficiaryCategory = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary category not found.");
  }

  if (payload.categoryName && payload.categoryName !== item.categoryName) {
    const existing = await prisma.beneficiaryCategory.findUnique({ where: { categoryName: payload.categoryName } });
    if (existing) {
      throw new customError(status.CONFLICT, `Category '${payload.categoryName}' already exists`);
    }
  }

  return await prisma.beneficiaryCategory.update({
    where: { id },
    data: {
      ...(payload.categoryName && { categoryName: payload.categoryName }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.priorityLevel && { priorityLevel: payload.priorityLevel }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteBeneficiaryCategory = async (id: string) => {
  const item = await prisma.beneficiaryCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary category not found.");
  }
  await prisma.beneficiaryCategory.delete({ where: { id } });
  return { message: "Beneficiary category deleted successfully." };
};


// ==================== 5. BENEFICIARY DOCUMENT SERVICES ====================
const createBeneficiaryDocument = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.documentType || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, documentType, and fileUrl are required.");
  }

  return await prisma.beneficiaryDocument.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      documentType: payload.documentType,
      documentNumber: payload.documentNumber || null,
      fileUrl: payload.fileUrl,
      verificationStatus: payload.verificationStatus || "PENDING",
    },
  });
};

const getAllBeneficiaryDocuments = async (query?: { beneficiaryId?: string; verificationStatus?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.verificationStatus) where.verificationStatus = query.verificationStatus;

  return await prisma.beneficiaryDocument.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryDocumentById = async (id: string) => {
  const item = await prisma.beneficiaryDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary document not found.");
  }
  return item;
};

const updateBeneficiaryDocument = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary document not found.");
  }

  return await prisma.beneficiaryDocument.update({
    where: { id },
    data: {
      ...(payload.documentType && { documentType: payload.documentType }),
      ...(payload.documentNumber !== undefined && { documentNumber: payload.documentNumber }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.verificationStatus && { verificationStatus: payload.verificationStatus }),
    },
  });
};

const deleteBeneficiaryDocument = async (id: string) => {
  const item = await prisma.beneficiaryDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary document not found.");
  }
  await prisma.beneficiaryDocument.delete({ where: { id } });
  return { message: "Beneficiary document deleted successfully." };
};


// ==================== 6. BENEFICIARY VERIFICATION SERVICES ====================
const createBeneficiaryVerification = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.verifiedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId and verifiedBy are required.");
  }

  return await prisma.reliefBeneficiaryVerification.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      verifiedBy: payload.verifiedBy,
      verificationMethod: payload.verificationMethod || "MANUAL_VERIFICATION",
      verificationDate: payload.verificationDate
        ? new Date(payload.verificationDate)
        : new Date(),
      status: payload.status || "PENDING",
      remarks: payload.remarks || null,
    },
  });
};

const getAllBeneficiaryVerifications = async (query?: { beneficiaryId?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.status) where.status = query.status;

  return await prisma.reliefBeneficiaryVerification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryVerificationById = async (id: string) => {
  const item = await prisma.reliefBeneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  return item;
};

const updateBeneficiaryVerification = async (id: string, payload: any) => {
  const item = await prisma.reliefBeneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }

  return await prisma.reliefBeneficiaryVerification.update({
    where: { id },
    data: {
      ...(payload.verifiedBy && { verifiedBy: payload.verifiedBy }),
      ...(payload.verificationMethod && { verificationMethod: payload.verificationMethod }),
      ...(payload.verificationDate && { verificationDate: new Date(payload.verificationDate) }),
      ...(payload.status && { status: payload.status }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

const deleteBeneficiaryVerification = async (id: string) => {
  const item = await prisma.reliefBeneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  await prisma.reliefBeneficiaryVerification.delete({ where: { id } });
  return { message: "Beneficiary verification record deleted successfully." };
};


// ==================== 7. BENEFICIARY NEED ASSESSMENT SERVICES ====================
const createBeneficiaryNeedAssessment = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.assessmentType || !payload.requiredSupport || !payload.assessedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, assessmentType, requiredSupport, and assessedBy are required.");
  }

  return await prisma.beneficiaryNeedAssessment.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      assessmentType: payload.assessmentType,
      requiredSupport: payload.requiredSupport,
      priority: payload.priority || "MEDIUM",
      assessedBy: payload.assessedBy,
      assessmentDate: payload.assessmentDate
        ? new Date(payload.assessmentDate)
        : new Date(),
    },
  });
};

const getAllBeneficiaryNeedAssessments = async (query?: { beneficiaryId?: string; priority?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.priority) where.priority = query.priority;

  return await prisma.beneficiaryNeedAssessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryNeedAssessmentById = async (id: string) => {
  const item = await prisma.beneficiaryNeedAssessment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Need assessment record not found.");
  }
  return item;
};

const updateBeneficiaryNeedAssessment = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryNeedAssessment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Need assessment record not found.");
  }

  return await prisma.beneficiaryNeedAssessment.update({
    where: { id },
    data: {
      ...(payload.assessmentType && { assessmentType: payload.assessmentType }),
      ...(payload.requiredSupport && { requiredSupport: payload.requiredSupport }),
      ...(payload.priority && { priority: payload.priority }),
      ...(payload.assessedBy && { assessedBy: payload.assessedBy }),
      ...(payload.assessmentDate && { assessmentDate: new Date(payload.assessmentDate) }),
    },
  });
};

const deleteBeneficiaryNeedAssessment = async (id: string) => {
  const item = await prisma.beneficiaryNeedAssessment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Need assessment record not found.");
  }
  await prisma.beneficiaryNeedAssessment.delete({ where: { id } });
  return { message: "Need assessment record deleted successfully." };
};


export const beneficiaryCoreService = {
  // Beneficiary
  createBeneficiary,
  getAllBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
  // BeneficiaryProfile
  createBeneficiaryProfile,
  getAllBeneficiaryProfiles,
  getBeneficiaryProfileById,
  updateBeneficiaryProfile,
  deleteBeneficiaryProfile,
  // FamilyMember
  createFamilyMember,
  getAllFamilyMembers,
  getFamilyMemberById,
  updateFamilyMember,
  deleteFamilyMember,
  // BeneficiaryCategory
  createBeneficiaryCategory,
  getAllBeneficiaryCategories,
  getBeneficiaryCategoryById,
  updateBeneficiaryCategory,
  deleteBeneficiaryCategory,
  // BeneficiaryDocument
  createBeneficiaryDocument,
  getAllBeneficiaryDocuments,
  getBeneficiaryDocumentById,
  updateBeneficiaryDocument,
  deleteBeneficiaryDocument,
  // ReliefBeneficiaryVerification
  createBeneficiaryVerification,
  getAllBeneficiaryVerifications,
  getBeneficiaryVerificationById,
  updateBeneficiaryVerification,
  deleteBeneficiaryVerification,
  // BeneficiaryNeedAssessment
  createBeneficiaryNeedAssessment,
  getAllBeneficiaryNeedAssessments,
  getBeneficiaryNeedAssessmentById,
  updateBeneficiaryNeedAssessment,
  deleteBeneficiaryNeedAssessment,
};
