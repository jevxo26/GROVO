import status from "http-status";
import { EmergencyPriority, EmergencyType } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateEmergencyCampaignPayload {
  campaignId: string;
  emergencyType: EmergencyType;
  priority?: EmergencyPriority;
  affectedArea: string;
  requiredAmount: number;
  currentAmount?: number;
  status?: string;
}

export interface UpdateEmergencyCampaignPayload {
  emergencyType?: EmergencyType;
  priority?: EmergencyPriority;
  affectedArea?: string;
  requiredAmount?: number;
  currentAmount?: number;
  status?: string;
}

const createEmergencyCampaign = async (payload: CreateEmergencyCampaignPayload) => {
  if (!payload.campaignId || !payload.emergencyType || !payload.affectedArea || !payload.requiredAmount) {
    throw new customError(status.BAD_REQUEST, "Required fields: campaignId, emergencyType, affectedArea, requiredAmount.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: payload.campaignId },
    include: { emergencyDetails: true },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  if (campaign.emergencyDetails) {
    throw new customError(status.CONFLICT, "Emergency details already exist for this campaign.");
  }

  const emergency = await prisma.emergencyCampaign.create({
    data: {
      campaignId: payload.campaignId,
      emergencyType: payload.emergencyType,
      priority: payload.priority || EmergencyPriority.HIGH,
      affectedArea: payload.affectedArea,
      requiredAmount: payload.requiredAmount,
      currentAmount: payload.currentAmount || 0,
      status: payload.status || "ACTIVE",
    },
    include: {
      campaign: {
        select: { id: true, title: true, campaignCode: true, raisedAmount: true },
      },
    },
  });

  return emergency;
};

const getAllEmergencyCampaigns = async (query?: {
  emergencyType?: EmergencyType;
  priority?: EmergencyPriority;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.emergencyType) {
    where.emergencyType = query.emergencyType;
  }

  if (query?.priority) {
    where.priority = query.priority;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { affectedArea: { contains: query.search, mode: "insensitive" } },
      { campaign: { title: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [emergencies, total] = await Promise.all([
    prisma.emergencyCampaign.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { priority: "asc" }, // CRITICAL first
        { createdAt: "desc" },
      ],
      include: {
        campaign: {
          select: { id: true, title: true, campaignCode: true, thumbnail: true, raisedAmount: true },
        },
      },
    }),
    prisma.emergencyCampaign.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: emergencies,
  };
};

const getEmergencyCampaignById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Emergency campaign ID is required.");
  }

  const emergency = await prisma.emergencyCampaign.findUnique({
    where: { id },
    include: {
      campaign: {
        include: { category: true, goals: true, milestones: true, media: true },
      },
    },
  });

  if (!emergency) {
    throw new customError(status.NOT_FOUND, "Emergency campaign record not found.");
  }

  return emergency;
};

const getEmergencyCampaignByCampaignId = async (campaignId: string) => {
  if (!campaignId) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const emergency = await prisma.emergencyCampaign.findUnique({
    where: { campaignId },
    include: {
      campaign: {
        select: { id: true, title: true, campaignCode: true, raisedAmount: true },
      },
    },
  });

  if (!emergency) {
    throw new customError(status.NOT_FOUND, "Emergency campaign record not found for this campaign.");
  }

  return emergency;
};

const updateEmergencyCampaign = async (id: string, payload: UpdateEmergencyCampaignPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Emergency campaign ID is required.");
  }

  const emergency = await prisma.emergencyCampaign.findUnique({
    where: { id },
  });

  if (!emergency) {
    throw new customError(status.NOT_FOUND, "Emergency campaign record not found.");
  }

  const updatedEmergency = await prisma.emergencyCampaign.update({
    where: { id },
    data: {
      ...(payload.emergencyType && { emergencyType: payload.emergencyType }),
      ...(payload.priority && { priority: payload.priority }),
      ...(payload.affectedArea && { affectedArea: payload.affectedArea }),
      ...(payload.requiredAmount !== undefined && { requiredAmount: payload.requiredAmount }),
      ...(payload.currentAmount !== undefined && { currentAmount: payload.currentAmount }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedEmergency;
};

const deleteEmergencyCampaign = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Emergency campaign ID is required.");
  }

  const emergency = await prisma.emergencyCampaign.findUnique({
    where: { id },
  });

  if (!emergency) {
    throw new customError(status.NOT_FOUND, "Emergency campaign record not found.");
  }

  await prisma.emergencyCampaign.delete({
    where: { id },
  });

  return { message: "Emergency campaign record deleted successfully." };
};

export const emergencyCampaignService = {
  createEmergencyCampaign,
  getAllEmergencyCampaigns,
  getEmergencyCampaignById,
  getEmergencyCampaignByCampaignId,
  updateEmergencyCampaign,
  deleteEmergencyCampaign,
};
