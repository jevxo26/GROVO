import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 1. VOLUNTEER SERVICES ====================
const createVolunteer = async (payload: any) => {
  if (!payload.userId || !payload.volunteerCode) {
    throw new customError(status.BAD_REQUEST, "userId and volunteerCode are required.");
  }

  const existingCode = await prisma.volunteer.findUnique({
    where: { volunteerCode: payload.volunteerCode },
  });

  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Volunteer code '${payload.volunteerCode}' already exists`
    );
  }

  return await prisma.volunteer.create({
    data: {
      userId: payload.userId,
      volunteerCode: payload.volunteerCode,
      branchId: payload.branchId || null,
      membershipId: payload.membershipId || null,
      joiningDate: payload.joiningDate
        ? new Date(payload.joiningDate)
        : new Date(),
      experience: payload.experience || null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllVolunteers = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.volunteerCode = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.volunteer.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerById = async (id: string) => {
  const item = await prisma.volunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer not found.");
  }
  return item;
};

const updateVolunteer = async (id: string, payload: any) => {
  const item = await prisma.volunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer not found.");
  }

  if (payload.volunteerCode && payload.volunteerCode !== item.volunteerCode) {
    const existing = await prisma.volunteer.findUnique({ where: { volunteerCode: payload.volunteerCode } });
    if (existing) {
      throw new customError(status.CONFLICT, `Volunteer code '${payload.volunteerCode}' already exists`);
    }
  }

  return await prisma.volunteer.update({
    where: { id },
    data: {
      ...(payload.volunteerCode && { volunteerCode: payload.volunteerCode }),
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.membershipId !== undefined && { membershipId: payload.membershipId }),
      ...(payload.joiningDate && { joiningDate: new Date(payload.joiningDate) }),
      ...(payload.experience !== undefined && { experience: payload.experience }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteer = async (id: string) => {
  const item = await prisma.volunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer not found.");
  }
  await prisma.volunteer.delete({ where: { id } });
  return { message: "Volunteer deleted successfully." };
};


// ==================== 2. VOLUNTEER PROFILE SERVICES ====================
const createVolunteerProfile = async (payload: any) => {
  if (!payload.volunteerId || !payload.emergencyContact) {
    throw new customError(status.BAD_REQUEST, "volunteerId and emergencyContact are required.");
  }

  const existing = await prisma.volunteerProfile.findUnique({
    where: { volunteerId: payload.volunteerId },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Volunteer profile already exists.");
  }

  return await prisma.volunteerProfile.create({
    data: {
      volunteerId: payload.volunteerId,
      profession: payload.profession || null,
      organization: payload.organization || null,
      skills: payload.skills || null,
      languages: payload.languages || null,
      emergencyContact: payload.emergencyContact,
      bloodGroup: payload.bloodGroup || null,
      availability: payload.availability || null,
    },
  });
};

const getAllVolunteerProfiles = async (query?: { bloodGroup?: string; search?: string }) => {
  const where: any = {};
  if (query?.bloodGroup) where.bloodGroup = query.bloodGroup;
  if (query?.search) {
    where.OR = [
      { profession: { contains: query.search, mode: "insensitive" } },
      { organization: { contains: query.search, mode: "insensitive" } },
      { skills: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.volunteerProfile.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerProfileById = async (id: string) => {
  const item = await prisma.volunteerProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer profile not found.");
  }
  return item;
};

const updateVolunteerProfile = async (id: string, payload: any) => {
  const item = await prisma.volunteerProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer profile not found.");
  }

  return await prisma.volunteerProfile.update({
    where: { id },
    data: {
      ...(payload.profession !== undefined && { profession: payload.profession }),
      ...(payload.organization !== undefined && { organization: payload.organization }),
      ...(payload.skills !== undefined && { skills: payload.skills }),
      ...(payload.languages !== undefined && { languages: payload.languages }),
      ...(payload.emergencyContact && { emergencyContact: payload.emergencyContact }),
      ...(payload.bloodGroup !== undefined && { bloodGroup: payload.bloodGroup }),
      ...(payload.availability !== undefined && { availability: payload.availability }),
    },
  });
};

const deleteVolunteerProfile = async (id: string) => {
  const item = await prisma.volunteerProfile.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer profile not found.");
  }
  await prisma.volunteerProfile.delete({ where: { id } });
  return { message: "Volunteer profile deleted successfully." };
};


// ==================== 3. VOLUNTEER SKILL SERVICES ====================
const createVolunteerSkill = async (payload: any) => {
  if (!payload.volunteerId || !payload.skillName) {
    throw new customError(status.BAD_REQUEST, "volunteerId and skillName are required.");
  }

  return await prisma.volunteerSkill.create({
    data: {
      volunteerId: payload.volunteerId,
      skillName: payload.skillName,
      skillLevel: payload.skillLevel || "INTERMEDIATE",
      experienceYears: payload.experienceYears ? Number(payload.experienceYears) : 0,
      verifiedBy: payload.verifiedBy || null,
    },
  });
};

const getAllVolunteerSkills = async (query?: { volunteerId?: string; skillLevel?: string; search?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.skillLevel) where.skillLevel = query.skillLevel;
  if (query?.search) {
    where.skillName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.volunteerSkill.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerSkillById = async (id: string) => {
  const item = await prisma.volunteerSkill.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer skill not found.");
  }
  return item;
};

const updateVolunteerSkill = async (id: string, payload: any) => {
  const item = await prisma.volunteerSkill.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer skill not found.");
  }

  return await prisma.volunteerSkill.update({
    where: { id },
    data: {
      ...(payload.skillName && { skillName: payload.skillName }),
      ...(payload.skillLevel && { skillLevel: payload.skillLevel }),
      ...(payload.experienceYears !== undefined && { experienceYears: Number(payload.experienceYears) }),
      ...(payload.verifiedBy !== undefined && { verifiedBy: payload.verifiedBy }),
    },
  });
};

const deleteVolunteerSkill = async (id: string) => {
  const item = await prisma.volunteerSkill.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer skill not found.");
  }
  await prisma.volunteerSkill.delete({ where: { id } });
  return { message: "Volunteer skill deleted successfully." };
};


// ==================== 4. VOLUNTEER AVAILABILITY SERVICES ====================
const createVolunteerAvailability = async (payload: any) => {
  if (!payload.volunteerId || !payload.availableDays || !payload.availableFrom || !payload.availableTo) {
    throw new customError(status.BAD_REQUEST, "volunteerId, availableDays, availableFrom, and availableTo are required.");
  }

  return await prisma.volunteerAvailability.create({
    data: {
      volunteerId: payload.volunteerId,
      availableDays: payload.availableDays,
      availableFrom: payload.availableFrom,
      availableTo: payload.availableTo,
      isAvailable: payload.isAvailable !== undefined ? Boolean(payload.isAvailable) : true,
    },
  });
};

const getAllVolunteerAvailabilities = async (query?: { volunteerId?: string; isAvailable?: boolean }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.isAvailable !== undefined) where.isAvailable = Boolean(query.isAvailable);

  return await prisma.volunteerAvailability.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerAvailabilityById = async (id: string) => {
  const item = await prisma.volunteerAvailability.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer availability record not found.");
  }
  return item;
};

const updateVolunteerAvailability = async (id: string, payload: any) => {
  const item = await prisma.volunteerAvailability.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer availability record not found.");
  }

  return await prisma.volunteerAvailability.update({
    where: { id },
    data: {
      ...(payload.availableDays && { availableDays: payload.availableDays }),
      ...(payload.availableFrom && { availableFrom: payload.availableFrom }),
      ...(payload.availableTo && { availableTo: payload.availableTo }),
      ...(payload.isAvailable !== undefined && { isAvailable: Boolean(payload.isAvailable) }),
    },
  });
};

const deleteVolunteerAvailability = async (id: string) => {
  const item = await prisma.volunteerAvailability.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer availability record not found.");
  }
  await prisma.volunteerAvailability.delete({ where: { id } });
  return { message: "Volunteer availability record deleted successfully." };
};


// ==================== 20. VOLUNTEER DOCUMENT SERVICES ====================
const createVolunteerDocument = async (payload: any) => {
  if (!payload.volunteerId || !payload.documentType || !payload.documentName || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "volunteerId, documentType, documentName, and fileUrl are required.");
  }

  return await prisma.volunteerDocument.create({
    data: {
      volunteerId: payload.volunteerId,
      documentType: payload.documentType,
      documentName: payload.documentName,
      fileUrl: payload.fileUrl,
      verificationStatus: payload.verificationStatus || "PENDING",
      uploadedAt: payload.uploadedAt ? new Date(payload.uploadedAt) : new Date(),
    },
  });
};

const getAllVolunteerDocuments = async (query?: { volunteerId?: string; documentType?: string; verificationStatus?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.documentType) where.documentType = query.documentType;
  if (query?.verificationStatus) where.verificationStatus = query.verificationStatus;

  return await prisma.volunteerDocument.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerDocumentById = async (id: string) => {
  const item = await prisma.volunteerDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer document not found.");
  }
  return item;
};

const updateVolunteerDocument = async (id: string, payload: any) => {
  const item = await prisma.volunteerDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer document not found.");
  }

  return await prisma.volunteerDocument.update({
    where: { id },
    data: {
      ...(payload.documentType && { documentType: payload.documentType }),
      ...(payload.documentName && { documentName: payload.documentName }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.verificationStatus && { verificationStatus: payload.verificationStatus }),
    },
  });
};

const deleteVolunteerDocument = async (id: string) => {
  const item = await prisma.volunteerDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer document not found.");
  }
  await prisma.volunteerDocument.delete({ where: { id } });
  return { message: "Volunteer document deleted successfully." };
};


// ==================== 21. VOLUNTEER ACTIVITY LOG SERVICES ====================
const createVolunteerActivityLog = async (payload: any) => {
  if (!payload.volunteerId || !payload.activity || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "volunteerId, activity, and performedBy are required.");
  }

  return await prisma.volunteerActivityLog.create({
    data: {
      volunteerId: payload.volunteerId,
      activity: payload.activity,
      description: payload.description || null,
      performedBy: payload.performedBy,
    },
  });
};

const getAllVolunteerActivityLogs = async (query?: { volunteerId?: string; activity?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.activity) where.activity = query.activity;

  return await prisma.volunteerActivityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerActivityLogById = async (id: string) => {
  const item = await prisma.volunteerActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer activity log not found.");
  }
  return item;
};

const deleteVolunteerActivityLog = async (id: string) => {
  const item = await prisma.volunteerActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer activity log not found.");
  }
  await prisma.volunteerActivityLog.delete({ where: { id } });
  return { message: "Volunteer activity log deleted successfully." };
};


export const volunteerCoreService = {
  // Volunteer
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  // VolunteerProfile
  createVolunteerProfile,
  getAllVolunteerProfiles,
  getVolunteerProfileById,
  updateVolunteerProfile,
  deleteVolunteerProfile,
  // VolunteerSkill
  createVolunteerSkill,
  getAllVolunteerSkills,
  getVolunteerSkillById,
  updateVolunteerSkill,
  deleteVolunteerSkill,
  // VolunteerAvailability
  createVolunteerAvailability,
  getAllVolunteerAvailabilities,
  getVolunteerAvailabilityById,
  updateVolunteerAvailability,
  deleteVolunteerAvailability,
  // VolunteerDocument
  createVolunteerDocument,
  getAllVolunteerDocuments,
  getVolunteerDocumentById,
  updateVolunteerDocument,
  deleteVolunteerDocument,
  // VolunteerActivityLog
  createVolunteerActivityLog,
  getAllVolunteerActivityLogs,
  getVolunteerActivityLogById,
  deleteVolunteerActivityLog,
};
