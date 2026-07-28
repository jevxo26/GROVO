import status from "http-status";
import { donorCoreService } from "../../services/donor_service/donorCore.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 1. DONOR CONTROLLERS ====================
const createDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createDonor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor created successfully",
    data: result,
  });
});

const getAllDonors = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllDonors(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donors retrieved successfully",
    data: result,
  });
});

const getDonorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getDonorById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor retrieved successfully",
    data: result,
  });
});

const updateDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateDonor(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor updated successfully",
    data: result,
  });
});

const deleteDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteDonor(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor deleted successfully",
    data: result,
  });
});


// ==================== 2. INDIVIDUAL DONOR CONTROLLERS ====================
const createIndividualDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createIndividualDonor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Individual donor created successfully",
    data: result,
  });
});

const getAllIndividualDonors = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllIndividualDonors(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donors retrieved successfully",
    data: result,
  });
});

const getIndividualDonorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getIndividualDonorById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donor retrieved successfully",
    data: result,
  });
});

const updateIndividualDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateIndividualDonor(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donor updated successfully",
    data: result,
  });
});

const deleteIndividualDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteIndividualDonor(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donor deleted successfully",
    data: result,
  });
});


// ==================== 3. CORPORATE DONOR CONTROLLERS ====================
const createCorporateDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createCorporateDonor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Corporate donor created successfully",
    data: result,
  });
});

const getAllCorporateDonors = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllCorporateDonors(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donors retrieved successfully",
    data: result,
  });
});

const getCorporateDonorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getCorporateDonorById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donor retrieved successfully",
    data: result,
  });
});

const updateCorporateDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateCorporateDonor(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donor updated successfully",
    data: result,
  });
});

const deleteCorporateDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteCorporateDonor(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donor deleted successfully",
    data: result,
  });
});


// ==================== 4. DONOR ORGANIZATION CONTROLLERS ====================
const createDonorOrganization = catchAsync(async (req, res) => {
  const result = await donorCoreService.createDonorOrganization(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor organization created successfully",
    data: result,
  });
});

const getAllDonorOrganizations = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllDonorOrganizations(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organizations retrieved successfully",
    data: result,
  });
});

const getDonorOrganizationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getDonorOrganizationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organization retrieved successfully",
    data: result,
  });
});

const updateDonorOrganization = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateDonorOrganization(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organization updated successfully",
    data: result,
  });
});

const deleteDonorOrganization = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteDonorOrganization(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organization deleted successfully",
    data: result,
  });
});


export const donorCoreController = {
  // Donor
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  // IndividualDonor
  createIndividualDonor,
  getAllIndividualDonors,
  getIndividualDonorById,
  updateIndividualDonor,
  deleteIndividualDonor,
  // CorporateDonor
  createCorporateDonor,
  getAllCorporateDonors,
  getCorporateDonorById,
  updateCorporateDonor,
  deleteCorporateDonor,
  // DonorOrganization
  createDonorOrganization,
  getAllDonorOrganizations,
  getDonorOrganizationById,
  updateDonorOrganization,
  deleteDonorOrganization,
};
