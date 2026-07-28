import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 19. VOLUNTEER TRAINING SERVICES ====================
export const createVolunteerTraining = async (payload: any) => {
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

export const getAllVolunteerTrainings = async (query?: { trainer?: string; status?: string }) => {
  const where: any = {};
  if (query?.trainer) where.trainer = query.trainer;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerTraining.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerTrainingById = async (id: string) => {
  const item = await prisma.volunteerTraining.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer training not found.");
  }
  return item;
};

export const updateVolunteerTraining = async (id: string, payload: any) => {
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

export const deleteVolunteerTraining = async (id: string) => {
  const item = await prisma.volunteerTraining.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer training not found.");
  }
  await prisma.volunteerTraining.delete({ where: { id } });
  return { message: "Volunteer training deleted successfully." };
};
