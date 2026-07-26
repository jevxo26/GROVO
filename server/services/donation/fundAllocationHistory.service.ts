import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface RecordFundAllocationPayload {
  fundId: string;
  projectId?: string;
  campaignId?: string;
  allocatedAmount: number;
  allocatedBy?: string;
  allocationDate?: string | Date;
  remarks?: string;
}

const recordFundAllocationHistory = async (
  authenticatedUserId: string | undefined,
  payload: RecordFundAllocationPayload
) => {
  if (!payload.fundId || !payload.allocatedAmount || payload.allocatedAmount <= 0) {
    throw new customError(status.BAD_REQUEST, "Required fields: fundId and allocatedAmount > 0.");
  }

  const fund = await prisma.fund.findUnique({
    where: { id: payload.fundId },
  });

  if (!fund) {
    throw new customError(status.NOT_FOUND, "Fund record not found.");
  }

  if (fund.currentBalance < payload.allocatedAmount) {
    throw new customError(
      status.BAD_REQUEST,
      `Insufficient balance in fund ${fund.fundName}. Available: ${fund.currentBalance}, Requested: ${payload.allocatedAmount}`
    );
  }

  if (payload.projectId) {
    const project = await prisma.project.findUnique({ where: { id: payload.projectId } });
    if (!project) {
      throw new customError(status.NOT_FOUND, "Project record not found.");
    }
  }

  if (payload.campaignId) {
    const campaign = await prisma.campaign.findUnique({ where: { id: payload.campaignId } });
    if (!campaign) {
      throw new customError(status.NOT_FOUND, "Campaign record not found.");
    }
  }

  const allocator = payload.allocatedBy || authenticatedUserId || null;
  const allocationDate = payload.allocationDate ? new Date(payload.allocationDate) : new Date();

  const result = await prisma.$transaction(async (tx) => {
    await tx.fund.update({
      where: { id: payload.fundId },
      data: { currentBalance: { decrement: payload.allocatedAmount } },
    });

    const allocation = await tx.fundAllocationHistory.create({
      data: {
        fundId: payload.fundId,
        projectId: payload.projectId || null,
        campaignId: payload.campaignId || null,
        allocatedAmount: payload.allocatedAmount,
        allocatedBy: allocator,
        allocationDate,
        remarks: payload.remarks || null,
      },
      include: {
        fund: { select: { id: true, fundName: true, fundCode: true, currentBalance: true } },
        project: { select: { id: true, projectName: true, projectCode: true } },
        campaign: { select: { id: true, title: true, campaignCode: true } },
        allocator: { select: { id: true, fullName: true, email: true } },
      },
    });

    return allocation;
  });

  return result;
};

const getFundAllocationHistoryByFundId = async (fundId: string) => {
  if (!fundId) {
    throw new customError(status.BAD_REQUEST, "Fund ID is required.");
  }

  const histories = await prisma.fundAllocationHistory.findMany({
    where: { fundId },
    orderBy: { allocationDate: "desc" },
    include: {
      project: { select: { id: true, projectName: true, projectCode: true } },
      campaign: { select: { id: true, title: true, campaignCode: true } },
      allocator: { select: { id: true, fullName: true, email: true } },
    },
  });

  return histories;
};

const getAllFundAllocationHistories = async (query?: {
  projectId?: string;
  campaignId?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.projectId) {
    where.projectId = query.projectId;
  }

  if (query?.campaignId) {
    where.campaignId = query.campaignId;
  }

  if (query?.search) {
    where.OR = [
      { remarks: { contains: query.search, mode: "insensitive" } },
      { fund: { fundName: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [histories, total, aggregate] = await Promise.all([
    prisma.fundAllocationHistory.findMany({
      where,
      skip,
      take: limit,
      orderBy: { allocationDate: "desc" },
      include: {
        fund: { select: { id: true, fundName: true, fundCode: true } },
        project: { select: { id: true, projectName: true, projectCode: true } },
        campaign: { select: { id: true, title: true, campaignCode: true } },
        allocator: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.fundAllocationHistory.count({ where }),
    prisma.fundAllocationHistory.aggregate({
      where,
      _sum: { allocatedAmount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalAllocatedSum: aggregate._sum.allocatedAmount || 0,
    },
    data: histories,
  };
};

const getFundAllocationHistoryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Allocation history ID is required.");
  }

  const history = await prisma.fundAllocationHistory.findUnique({
    where: { id },
    include: {
      fund: true,
      project: true,
      campaign: true,
      allocator: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!history) {
    throw new customError(status.NOT_FOUND, "Fund allocation history record not found.");
  }

  return history;
};

const deleteFundAllocationHistory = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Allocation history ID is required.");
  }

  const history = await prisma.fundAllocationHistory.findUnique({
    where: { id },
  });

  if (!history) {
    throw new customError(status.NOT_FOUND, "Fund allocation history record not found.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.fund.update({
      where: { id: history.fundId },
      data: { currentBalance: { increment: history.allocatedAmount } },
    });

    await tx.fundAllocationHistory.delete({
      where: { id },
    });
  });

  return { message: "Fund allocation history deleted and fund balance restored successfully." };
};

export const fundAllocationHistoryService = {
  recordFundAllocationHistory,
  getFundAllocationHistoryByFundId,
  getAllFundAllocationHistories,
  getFundAllocationHistoryById,
  deleteFundAllocationHistory,
};
