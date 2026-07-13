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

export const volunteerService = {
  registerPerformance,
  getAvailableVolunteers,
};
