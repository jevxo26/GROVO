import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectReportPayload {
  projectId: string;
  reportTitle: string;
  summary: string;
  beneficiariesCount?: number;
  totalExpense?: number;
  reportFile?: string;
  publishedAt?: string | Date;
}

export interface UpdateProjectReportPayload {
  reportTitle?: string;
  summary?: string;
  beneficiariesCount?: number;
  totalExpense?: number;
  reportFile?: string;
  publishedAt?: string | Date;
}

const createProjectReport = async (publishedByUserId: string | undefined, payload: CreateProjectReportPayload) => {
  if (!payload.projectId || !payload.reportTitle || !payload.summary) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId, reportTitle, and summary.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
    include: {
      _count: { select: { beneficiaries: true } },
    },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  // Calculate actual total expenses if not provided
  let calculatedExpense = payload.totalExpense;
  if (calculatedExpense === undefined) {
    const expenseAggregate = await prisma.projectExpense.aggregate({
      where: { projectId: payload.projectId },
      _sum: { amount: true },
    });
    calculatedExpense = expenseAggregate._sum.amount || 0;
  }

  const beneficiariesCount = payload.beneficiariesCount !== undefined
    ? payload.beneficiariesCount
    : project._count.beneficiaries;

  const report = await prisma.projectReport.create({
    data: {
      projectId: payload.projectId,
      reportTitle: payload.reportTitle,
      summary: payload.summary,
      beneficiariesCount,
      totalExpense: calculatedExpense,
      reportFile: payload.reportFile || null,
      publishedBy: publishedByUserId || null,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : new Date(),
    },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true, status: true } },
    },
  });

  return report;
};

const getProjectReportsByProjectId = async (
  projectId: string,
  query?: { page?: number; limit?: number }
) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const [reports, total] = await Promise.all([
    prisma.projectReport.findMany({
      where: { projectId },
      skip,
      take: limit,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.projectReport.count({ where: { projectId } }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: reports,
  };
};

const getProjectReportById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Report ID is required.");
  }

  const report = await prisma.projectReport.findUnique({
    where: { id },
    include: {
      project: {
        select: {
          id: true,
          projectName: true,
          projectCode: true,
          startDate: true,
          endDate: true,
          status: true,
          campaign: { select: { id: true, title: true, campaignCode: true } },
        },
      },
    },
  });

  if (!report) {
    throw new customError(status.NOT_FOUND, "Project report not found.");
  }

  return report;
};

const updateProjectReport = async (id: string, payload: UpdateProjectReportPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Report ID is required.");
  }

  const report = await prisma.projectReport.findUnique({
    where: { id },
  });

  if (!report) {
    throw new customError(status.NOT_FOUND, "Project report not found.");
  }

  const updatedReport = await prisma.projectReport.update({
    where: { id },
    data: {
      ...(payload.reportTitle && { reportTitle: payload.reportTitle }),
      ...(payload.summary && { summary: payload.summary }),
      ...(payload.beneficiariesCount !== undefined && { beneficiariesCount: payload.beneficiariesCount }),
      ...(payload.totalExpense !== undefined && { totalExpense: payload.totalExpense }),
      ...(payload.reportFile !== undefined && { reportFile: payload.reportFile }),
      ...(payload.publishedAt && { publishedAt: new Date(payload.publishedAt) }),
    },
  });

  return updatedReport;
};

const deleteProjectReport = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Report ID is required.");
  }

  const report = await prisma.projectReport.findUnique({
    where: { id },
  });

  if (!report) {
    throw new customError(status.NOT_FOUND, "Project report not found.");
  }

  await prisma.projectReport.delete({
    where: { id },
  });

  return { message: "Project report deleted successfully." };
};

export const projectReportService = {
  createProjectReport,
  getProjectReportsByProjectId,
  getProjectReportById,
  updateProjectReport,
  deleteProjectReport,
};
