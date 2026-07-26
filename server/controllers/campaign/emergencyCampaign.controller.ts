import status from "http-status";
import { EmergencyPriority, EmergencyType } from "../../../generated/prisma/enums";
import { emergencyCampaignService } from "../../services/campaign/emergencyCampaign.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createEmergencyCampaign = catchAsync(async (req, res) => {
  const result = await emergencyCampaignService.createEmergencyCampaign(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Emergency campaign details created successfully",
    data: result,
  });
});

const getAllEmergencyCampaigns = catchAsync(async (req, res) => {
  const query = {
    emergencyType: req.query.emergencyType as EmergencyType | undefined,
    priority: req.query.priority as EmergencyPriority | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await emergencyCampaignService.getAllEmergencyCampaigns(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Emergency campaigns fetched successfully",
    data: result,
  });
});

const getEmergencyCampaignById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await emergencyCampaignService.getEmergencyCampaignById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Emergency campaign fetched successfully",
    data: result,
  });
});

const getEmergencyCampaignByCampaignId = catchAsync(async (req, res) => {
  const { campaignId } = req.params;
  const result = await emergencyCampaignService.getEmergencyCampaignByCampaignId(campaignId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Emergency campaign details fetched successfully",
    data: result,
  });
});

const updateEmergencyCampaign = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await emergencyCampaignService.updateEmergencyCampaign(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Emergency campaign details updated successfully",
    data: result,
  });
});

const deleteEmergencyCampaign = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await emergencyCampaignService.deleteEmergencyCampaign(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Emergency campaign details deleted successfully",
    data: result,
  });
});

export const emergencyCampaignController = {
  createEmergencyCampaign,
  getAllEmergencyCampaigns,
  getEmergencyCampaignById,
  getEmergencyCampaignByCampaignId,
  updateEmergencyCampaign,
  deleteEmergencyCampaign,
};
