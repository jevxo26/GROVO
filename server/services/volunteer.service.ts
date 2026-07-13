import { prisma } from "../lib/prisma";

const registerPerformance = async (payload: {
  volunteerId: string;
  totalAssignments: number;
  completedAssignments: number;
  attendanceRate: number;
  score: number;
}) => {
  return await prisma.volunteerPerformance.create({
    data: {
      volunteerId: payload.volunteerId,
      totalAssignments: payload.totalAssignments,
      completedAssignments: payload.completedAssignments,
      attendanceRate: payload.attendanceRate,
      performanceScore: payload.score,
    },
  });
};

const getAvailableVolunteers = async () => {
  return await prisma.volunteer.findMany({
    where: { status: "ACTIVE" },
    include: {
      availabilities: { where: { isAvailable: true } },
      skills: true,
    },
  });
};

const registerVolunteer = async (payload: {
  userId: string;
  branchId: string;
  profession?: string;
  organization?: string;
  skills?: string;
  languages?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  experience?: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const existing = await tx.volunteer.findUnique({
      where: { userId: payload.userId },
    });
    if (existing) throw new Error("VOLUNTEER_ALREADY_REGISTERED");

    const volunteerCode = `V-${Date.now()}`;

    const volunteer = await tx.volunteer.create({
      data: {
        userId: payload.userId,
        branchId: payload.branchId,
        volunteerCode,
        experience: payload.experience,
        status: "ACTIVE",
      },
    });

    await tx.volunteerProfile.create({
      data: {
        volunteerId: volunteer.id,
        profession: payload.profession,
        organization: payload.organization,
        skills: payload.skills,
        languages: payload.languages,
        emergencyContact: payload.emergencyContact,
        bloodGroup: payload.bloodGroup,
      },
    });

    await tx.volunteerPerformance.create({
      data: {
        volunteerId: volunteer.id,
        totalAssignments: 0,
        completedAssignments: 0,
        attendanceRate: 100,
        performanceScore: 0,
      },
    });

    return volunteer;
  });
};

const assignVolunteer = async (payload: {
  volunteerId: string;
  campaignId?: string;
  projectId?: string;
  assignedBy: string;
  assignedRole?: string;
}) => {
  return await prisma.volunteerAssignment.create({
    data: {
      volunteerId: payload.volunteerId,
      campaignId: payload.campaignId,
      projectId: payload.projectId,
      assignedBy: payload.assignedBy,
      assignedRole: payload.assignedRole,
      status: "ACTIVE",
    },
  });
};

const getPerformance = async (volunteerId: string) => {
  return await prisma.volunteerPerformance.findFirst({
    where: { volunteerId },
    orderBy: { createdAt: "desc" },
  });
};

const listVolunteers = async (query: { page?: number; limit?: number; status?: string }) => {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (query.status) where.status = query.status;

  const [volunteers, total] = await Promise.all([
    prisma.volunteer.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: { select: { name: true, email: true } },
        branch: { select: { branchName: true } },
        performances: { take: 1, orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.volunteer.count({ where }),
  ]);

  return { data: volunteers, meta: { page, limit, total } };
};

export const volunteerService = {
  registerPerformance,
  getAvailableVolunteers,
  registerVolunteer,
  assignVolunteer,
  getPerformance,
  listVolunteers,
};
