import status from "http-status";
import { beneficiaryReliefService } from "../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 8. RELIEF PACKAGE CONTROLLERS ====================
const createReliefPackage = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createReliefPackage(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Relief package created successfully",
    data: result,
  });
});

const getAllReliefPackages = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllReliefPackages(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief packages retrieved successfully",
    data: result,
  });
});

const getReliefPackageById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getReliefPackageById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief package retrieved successfully",
    data: result,
  });
});

const updateReliefPackage = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateReliefPackage(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief package updated successfully",
    data: result,
  });
});

const deleteReliefPackage = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteReliefPackage(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief package deleted successfully",
    data: result,
  });
});


// ==================== 9. RELIEF ITEM CONTROLLERS ====================
const createReliefItem = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createReliefItem(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Relief item created successfully",
    data: result,
  });
});

const getAllReliefItems = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllReliefItems(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief items retrieved successfully",
    data: result,
  });
});

const getReliefItemById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getReliefItemById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief item retrieved successfully",
    data: result,
  });
});

const updateReliefItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateReliefItem(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief item updated successfully",
    data: result,
  });
});

const deleteReliefItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteReliefItem(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief item deleted successfully",
    data: result,
  });
});


// ==================== 10. DISTRIBUTION CAMPAIGN CONTROLLERS ====================
const createDistributionCampaign = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionCampaign(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution campaign created successfully",
    data: result,
  });
});

const getAllDistributionCampaigns = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllDistributionCampaigns(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaigns retrieved successfully",
    data: result,
  });
});

const getDistributionCampaignById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getDistributionCampaignById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaign retrieved successfully",
    data: result,
  });
});

const updateDistributionCampaign = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateDistributionCampaign(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaign updated successfully",
    data: result,
  });
});

const deleteDistributionCampaign = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteDistributionCampaign(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution campaign deleted successfully",
    data: result,
  });
});


// ==================== 11. DISTRIBUTION SCHEDULE CONTROLLERS ====================
const createDistributionSchedule = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution schedule created successfully",
    data: result,
  });
});

const getAllDistributionSchedules = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllDistributionSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedules retrieved successfully",
    data: result,
  });
});

const getDistributionScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getDistributionScheduleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedule retrieved successfully",
    data: result,
  });
});

const updateDistributionSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateDistributionSchedule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedule updated successfully",
    data: result,
  });
});

const deleteDistributionSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteDistributionSchedule(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution schedule deleted successfully",
    data: result,
  });
});


// ==================== 12. DISTRIBUTION CENTER CONTROLLERS ====================
const createDistributionCenter = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionCenter(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution center created successfully",
    data: result,
  });
});

const getAllDistributionCenters = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllDistributionCenters(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution centers retrieved successfully",
    data: result,
  });
});

const getDistributionCenterById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getDistributionCenterById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution center retrieved successfully",
    data: result,
  });
});

const updateDistributionCenter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateDistributionCenter(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution center updated successfully",
    data: result,
  });
});

const deleteDistributionCenter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteDistributionCenter(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution center deleted successfully",
    data: result,
  });
});


// ==================== 15. BENEFICIARY QR CODE CONTROLLERS ====================
const createBeneficiaryQRCode = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createBeneficiaryQRCode(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary QR Code created successfully",
    data: result,
  });
});

const getAllBeneficiaryQRCodes = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllBeneficiaryQRCodes(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Codes retrieved successfully",
    data: result,
  });
});

const getBeneficiaryQRCodeById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getBeneficiaryQRCodeById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Code retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryQRCode = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateBeneficiaryQRCode(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Code updated successfully",
    data: result,
  });
});

const deleteBeneficiaryQRCode = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteBeneficiaryQRCode(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Code deleted successfully",
    data: result,
  });
});


export const beneficiaryReliefController = {
  // ReliefPackage
  createReliefPackage,
  getAllReliefPackages,
  getReliefPackageById,
  updateReliefPackage,
  deleteReliefPackage,
  // ReliefItem
  createReliefItem,
  getAllReliefItems,
  getReliefItemById,
  updateReliefItem,
  deleteReliefItem,
  // DistributionCampaign
  createDistributionCampaign,
  getAllDistributionCampaigns,
  getDistributionCampaignById,
  updateDistributionCampaign,
  deleteDistributionCampaign,
  // DistributionSchedule
  createDistributionSchedule,
  getAllDistributionSchedules,
  getDistributionScheduleById,
  updateDistributionSchedule,
  deleteDistributionSchedule,
  // DistributionCenter
  createDistributionCenter,
  getAllDistributionCenters,
  getDistributionCenterById,
  updateDistributionCenter,
  deleteDistributionCenter,
  // BeneficiaryQRCode
  createBeneficiaryQRCode,
  getAllBeneficiaryQRCodes,
  getBeneficiaryQRCodeById,
  updateBeneficiaryQRCode,
  deleteBeneficiaryQRCode,
};
