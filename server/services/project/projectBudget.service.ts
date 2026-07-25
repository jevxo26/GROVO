import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectBudgetPayload {
  projectId: string;
  estimatedBudget: number;
  approvedBudget?: number;
  allocatedBudget?: number;
  approvedBy?: string;
}

export interface UpdateProjectBudgetPayload {
  estimatedBudget?: number;
  approvedBudget?: number;
  allocatedBudget?: number;
  approvedBy?: string;
}

const createProjectBudget = async (approvedByUserId: string | undefined, payload: CreateProjectBudgetPayload) => {
  if (!payload.projectId || payload.estimatedBudget === undefined) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId and estimatedBudget.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
    include: { budget: true },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  if (project.budget) {
    throw new customError(status.CONFLICT, "Budget record already exists for this project.");
  }

  const approvedBudget = payload.approvedBudget || 0;
  const allocatedBudget = payload.allocatedBudget || 0;
  const remainingBudget = approvedBudget - allocatedBudget;

  const budget = await prisma.projectBudget.create({
    data: {
      projectId: payload.projectId,
      estimatedBudget: payload.estimatedBudget,
      approvedBudget,
      allocatedBudget,
      remainingBudget,
      approvedBy: payload.approvedBy || approvedByUserId || null,
    },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true },
      },
    },
  });

  return budget;
};

const getProjectBudgetByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const budget = await prisma.projectBudget.findUnique({
    where: { projectId },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true, status: true },
      },
    },
  });

  if (!budget) {
    throw new customError(status.NOT_FOUND, "Project budget not found for this project.");
  }

  return budget;
};

const getProjectBudgetById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Budget ID is required.");
  }

  const budget = await prisma.projectBudget.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true },
      },
    },
  });

  if (!budget) {
    throw new customError(status.NOT_FOUND, "Project budget not found.");
  }

  return budget;
};

const updateProjectBudget = async (id: string, approvedByUserId: string | undefined, payload: UpdateProjectBudgetPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Budget ID is required.");
  }

  const budget = await prisma.projectBudget.findUnique({
    where: { id },
  });

  if (!budget) {
    throw new customError(status.NOT_FOUND, "Project budget not found.");
  }

  const estimatedBudget = payload.estimatedBudget !== undefined ? payload.estimatedBudget : budget.estimatedBudget;
  const approvedBudget = payload.approvedBudget !== undefined ? payload.approvedBudget : budget.approvedBudget;
  const allocatedBudget = payload.allocatedBudget !== undefined ? payload.allocatedBudget : budget.allocatedBudget;
  const remainingBudget = approvedBudget - allocatedBudget;

  const updatedBudget = await prisma.projectBudget.update({
    where: { id },
    data: {
      estimatedBudget,
      approvedBudget,
      allocatedBudget,
      remainingBudget,
      ...(payload.approvedBy !== undefined
        ? { approvedBy: payload.approvedBy }
        : approvedByUserId
        ? { approvedBy: approvedByUserId }
        : {}),
    },
  });

  return updatedBudget;
};

const deleteProjectBudget = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Budget ID is required.");
  }

  const budget = await prisma.projectBudget.findUnique({
    where: { id },
  });

  if (!budget) {
    throw new customError(status.NOT_FOUND, "Project budget not found.");
  }

  await prisma.projectBudget.delete({
    where: { id },
  });

  return { message: "Project budget deleted successfully." };
};

export const projectBudgetService = {
  createProjectBudget,
  getProjectBudgetByProjectId,
  getProjectBudgetById,
  updateProjectBudget,
  deleteProjectBudget,
};
