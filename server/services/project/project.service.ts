import status from "http-status";
import { ProjectStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectPayload {
  projectName: string;
  description: string;
  campaignId?: string;
  categoryId?: string;
  branchId?: string;
  startDate: string | Date;
  endDate?: string | Date;
  projectManagerId?: string;
  status?: ProjectStatus;
}

export interface UpdateProjectPayload {
  projectName?: string;
  description?: string;
  campaignId?: string;
  categoryId?: string;
  branchId?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  projectManagerId?: string;
  status?: ProjectStatus;
}

const generateProjectCode = async (): Promise<string> => {
  const year = new Date().getFullYear();
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    code = `PRJ-${year}-${randomDigits}`;
    const existing = await prisma.project.findUnique({
      where: { projectCode: code },
    });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

const createProject = async (payload: CreateProjectPayload) => {
  if (!payload.projectName || !payload.description || !payload.startDate) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectName, description, startDate.");
  }

  if (payload.campaignId) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: payload.campaignId },
    });
    if (!campaign) {
      throw new customError(status.NOT_FOUND, "Campaign not found.");
    }
  }

  if (payload.categoryId) {
    const category = await prisma.projectCategory.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category) {
      throw new customError(status.NOT_FOUND, "Project category not found.");
    }
  }

  if (payload.projectManagerId) {
    const manager = await prisma.user.findUnique({
      where: { id: payload.projectManagerId },
    });
    if (!manager) {
      throw new customError(status.NOT_FOUND, "Project manager user not found.");
    }
  }

  const projectCode = await generateProjectCode();

  const project = await prisma.project.create({
    data: {
      projectCode,
      projectName: payload.projectName,
      description: payload.description,
      campaignId: payload.campaignId || null,
      categoryId: payload.categoryId || null,
      branchId: payload.branchId || null,
      startDate: new Date(payload.startDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      projectManagerId: payload.projectManagerId || null,
      status: payload.status || ProjectStatus.PLANNED,
    },
    include: {
      campaign: { select: { id: true, title: true, campaignCode: true } },
      category: { select: { id: true, name: true } },
      projectManager: { select: { id: true, fullName: true, email: true } },
    },
  });

  return project;
};

const getAllProjects = async (query?: {
  campaignId?: string;
  categoryId?: string;
  projectManagerId?: string;
  status?: ProjectStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.campaignId) {
    where.campaignId = query.campaignId;
  }

  if (query?.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query?.projectManagerId) {
    where.projectManagerId = query.projectManagerId;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { projectName: { contains: query.search, mode: "insensitive" } },
      { projectCode: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        campaign: { select: { id: true, title: true, campaignCode: true } },
        category: { select: { id: true, name: true } },
        projectManager: { select: { id: true, fullName: true, email: true } },
        budget: { select: { estimatedBudget: true, approvedBudget: true, allocatedBudget: true, remainingBudget: true } },
        _count: {
          select: { expenses: true, beneficiaries: true, volunteers: true, updates: true },
        },
      },
    }),
    prisma.project.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: projects,
  };
};

const getProjectById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      campaign: true,
      category: true,
      projectManager: { select: { id: true, fullName: true, email: true, phone: true } },
      budget: true,
      expenses: { include: { attachments: true } },
      beneficiaries: true,
      volunteers: { include: { volunteer: { select: { id: true, fullName: true, email: true, phone: true } } } },
      gallery: true,
      updates: true,
      timeline: true,
      fundAllocations: true,
      reports: true,
    },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  return project;
};

const getProjectByCode = async (projectCode: string) => {
  if (!projectCode) {
    throw new customError(status.BAD_REQUEST, "Project code is required.");
  }

  const project = await prisma.project.findUnique({
    where: { projectCode },
    include: {
      campaign: true,
      category: true,
      projectManager: { select: { id: true, fullName: true, email: true } },
      budget: true,
      updates: true,
      reports: true,
    },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  return project;
};

const updateProject = async (id: string, payload: UpdateProjectPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  if (payload.campaignId) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: payload.campaignId },
    });
    if (!campaign) {
      throw new customError(status.NOT_FOUND, "Campaign not found.");
    }
  }

  if (payload.categoryId) {
    const category = await prisma.projectCategory.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category) {
      throw new customError(status.NOT_FOUND, "Project category not found.");
    }
  }

  if (payload.projectManagerId) {
    const manager = await prisma.user.findUnique({
      where: { id: payload.projectManagerId },
    });
    if (!manager) {
      throw new customError(status.NOT_FOUND, "Project manager user not found.");
    }
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      ...(payload.projectName && { projectName: payload.projectName }),
      ...(payload.description && { description: payload.description }),
      ...(payload.campaignId !== undefined && { campaignId: payload.campaignId }),
      ...(payload.categoryId !== undefined && { categoryId: payload.categoryId }),
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.projectManagerId !== undefined && { projectManagerId: payload.projectManagerId }),
      ...(payload.status && { status: payload.status }),
    },
    include: {
      campaign: true,
      category: true,
      projectManager: { select: { id: true, fullName: true, email: true } },
    },
  });

  return updatedProject;
};

const deleteProject = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      _count: { select: { expenses: true, fundAllocations: true } },
    },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  if (project._count.expenses > 0 || project._count.fundAllocations > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete project with active financial records (expenses or fund allocations). Set status to CANCELLED instead."
    );
  }

  await prisma.project.delete({
    where: { id },
  });

  return { message: "Project deleted successfully." };
};

const getProjectStats = async () => {
  const [totalProjects, inProgressProjects, completedProjects, plannedProjects] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: ProjectStatus.IN_PROGRESS } }),
    prisma.project.count({ where: { status: ProjectStatus.COMPLETED } }),
    prisma.project.count({ where: { status: ProjectStatus.PLANNED } }),
  ]);

  return {
    totalProjects,
    inProgressProjects,
    completedProjects,
    plannedProjects,
  };
};

export const projectService = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByCode,
  updateProject,
  deleteProject,
  getProjectStats,
};
