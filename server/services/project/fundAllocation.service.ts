import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateFundAllocationPayload {
  campaignId: string;
  projectId: string;
  allocatedAmount: number;
  allocationDate?: string | Date;
  approvedBy?: string;
  remarks?: string;
}

const createFundAllocation = async (approvedByUserId: string | undefined, payload: CreateFundAllocationPayload) => {
  if (!payload.campaignId || !payload.projectId || !payload.allocatedAmount || payload.allocatedAmount <= 0) {
    throw new customError(status.BAD_REQUEST, "Required fields: valid campaignId, projectId, and allocatedAmount > 0.");
  }

  const [campaign, project] = await Promise.all([
    prisma.campaign.findUnique({ where: { id: payload.campaignId } }),
    prisma.project.findUnique({ where: { id: payload.projectId }, include: { budget: true } }),
  ]);

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  const approver = payload.approvedBy || approvedByUserId || null;
  const allocationDate = payload.allocationDate ? new Date(payload.allocationDate) : new Date();

  const result = await prisma.$transaction(async (tx) => {
    const allocation = await tx.fundAllocation.create({
      data: {
        campaignId: payload.campaignId,
        projectId: payload.projectId,
        allocatedAmount: payload.allocatedAmount,
        allocationDate,
        approvedBy: approver,
        remarks: payload.remarks || null,
      },
      include: {
        campaign: { select: { id: true, title: true, campaignCode: true } },
        project: { select: { id: true, projectName: true, projectCode: true } },
      },
    });

    if (project.budget) {
      const newAllocated = project.budget.allocatedBudget + payload.allocatedAmount;
      const newRemaining = project.budget.approvedBudget - newAllocated;

      await tx.projectBudget.update({
        where: { id: project.budget.id },
        data: {
          allocatedBudget: newAllocated,
          remainingBudget: newRemaining,
        },
      });
    }

    return allocation;
  });

  return result;
};

const getFundAllocationsByCampaignId = async (campaignId: string) => {
  if (!campaignId) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const allocations = await prisma.fundAllocation.findMany({
    where: { campaignId },
    orderBy: { allocationDate: "desc" },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true, status: true } },
    },
  });

  return allocations;
};

const getFundAllocationsByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const allocations = await prisma.fundAllocation.findMany({
    where: { projectId },
    orderBy: { allocationDate: "desc" },
    include: {
      campaign: { select: { id: true, title: true, campaignCode: true } },
    },
  });

  return allocations;
};

const getFundAllocationById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Allocation ID is required.");
  }

  const allocation = await prisma.fundAllocation.findUnique({
    where: { id },
    include: {
      campaign: { select: { id: true, title: true, campaignCode: true } },
      project: { select: { id: true, projectName: true, projectCode: true } },
    },
  });

  if (!allocation) {
    throw new customError(status.NOT_FOUND, "Fund allocation record not found.");
  }

  return allocation;
};

const deleteFundAllocation = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Allocation ID is required.");
  }

  const allocation = await prisma.fundAllocation.findUnique({
    where: { id },
    include: { project: { include: { budget: true } } },
  });

  if (!allocation) {
    throw new customError(status.NOT_FOUND, "Fund allocation record not found.");
  }

  await prisma.$transaction(async (tx) => {
    if (allocation.project.budget) {
      const newAllocated = Math.max(0, allocation.project.budget.allocatedBudget - allocation.allocatedAmount);
      const newRemaining = allocation.project.budget.approvedBudget - newAllocated;

      await tx.projectBudget.update({
        where: { id: allocation.project.budget.id },
        data: {
          allocatedBudget: newAllocated,
          remainingBudget: newRemaining,
        },
      });
    }

    await tx.fundAllocation.delete({
      where: { id },
    });
  });

  return { message: "Fund allocation record deleted successfully." };
};

export const fundAllocationService = {
  createFundAllocation,
  getFundAllocationsByCampaignId,
  getFundAllocationsByProjectId,
  getFundAllocationById,
  deleteFundAllocation,
};
