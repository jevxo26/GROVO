import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createVolunteerPerformance = async (payload: any) => {
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

const createVolunteerReward = async (payload: any) => {
  return await prisma.volunteerReward.create({
    data: {
      volunteerId: payload.volunteerId,
      rewardType: payload.rewardType,
      title: payload.title,
      description: payload.description,
      rewardDate: payload.rewardDate ? new Date(payload.rewardDate) : undefined,
    },
  });
};

const createVolunteerCertificate = async (payload: any) => {
  const existing = await prisma.volunteerCertificate.findUnique({
    where: { certificateNumber: payload.certificateNumber },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Certificate '${payload.certificateNumber}' already exists`,
    );
  }

  return await prisma.volunteerCertificate.create({
    data: {
      volunteerId: payload.volunteerId,
      certificateType: payload.certificateType,
      certificateNumber: payload.certificateNumber,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : undefined,
      certificateUrl: payload.certificateUrl,
    },
  });
};

const createVolunteerExpense = async (payload: any) => {
  return await prisma.volunteerExpense.create({
    data: {
      volunteerId: payload.volunteerId,
      activityId: payload.activityId,
      expenseType: payload.expenseType,
      amount: Number(payload.amount),
      description: payload.description,
      receiptUrl: payload.receiptUrl,
      status: payload.status,
    },
  });
};

const createVolunteerReimbursement = async (payload: any) => {
  const existing = await prisma.volunteerReimbursement.findUnique({
    where: { expenseId: payload.expenseId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Reimbursement already exists for expense",
    );
  }

  return await prisma.volunteerReimbursement.create({
    data: {
      expenseId: payload.expenseId,
      approvedAmount: Number(payload.approvedAmount),
      approvedBy: payload.approvedBy,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentStatus,
      paidAt: payload.paidAt ? new Date(payload.paidAt) : undefined,
    },
  });
};

const createVolunteerAnnouncement = async (payload: any) => {
  return await prisma.volunteerAnnouncement.create({
    data: {
      title: payload.title,
      description: payload.description,
      targetGroup: payload.targetGroup,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      publishedBy: payload.publishedBy,
      status: payload.status,
    },
  });
};

const createVolunteerTraining = async (payload: any) => {
  return await prisma.volunteerTraining.create({
    data: {
      trainingTitle: payload.trainingTitle,
      description: payload.description,
      trainer: payload.trainer,
      trainingDate: new Date(payload.trainingDate),
      location: payload.location,
      certificateAvailable: Boolean(payload.certificateAvailable),
      status: payload.status,
    },
  });
};

export const volunteerRewardsService = {
  createVolunteerPerformance,
  createVolunteerReward,
  createVolunteerCertificate,
  createVolunteerExpense,
  createVolunteerReimbursement,
  createVolunteerAnnouncement,
  createVolunteerTraining,
};
