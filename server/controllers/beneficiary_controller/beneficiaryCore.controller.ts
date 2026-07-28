import status from "http-status";
import { beneficiaryCoreService } from "../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 1. BENEFICIARY CONTROLLERS ====================
const createBeneficiary = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiary(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary created successfully",
    data: result,
  });
});

const getAllBeneficiaries = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaries(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiaries retrieved successfully",
    data: result,
  });
});

const getBeneficiaryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary retrieved successfully",
    data: result,
  });
});

const updateBeneficiary = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiary(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary updated successfully",
    data: result,
  });
});

const deleteBeneficiary = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiary(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary deleted successfully",
    data: result,
  });
});


// ==================== 2. BENEFICIARY PROFILE CONTROLLERS ====================
const createBeneficiaryProfile = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryProfile(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary profile created successfully",
    data: result,
  });
});

const getAllBeneficiaryProfiles = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryProfiles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profiles retrieved successfully",
    data: result,
  });
});

const getBeneficiaryProfileById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryProfileById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profile retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryProfile(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profile updated successfully",
    data: result,
  });
});

const deleteBeneficiaryProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryProfile(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profile deleted successfully",
    data: result,
  });
});


// ==================== 3. FAMILY MEMBER CONTROLLERS ====================
const createFamilyMember = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createFamilyMember(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Family member created successfully",
    data: result,
  });
});

const getAllFamilyMembers = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllFamilyMembers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family members retrieved successfully",
    data: result,
  });
});

const getFamilyMemberById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getFamilyMemberById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family member retrieved successfully",
    data: result,
  });
});

const updateFamilyMember = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateFamilyMember(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family member updated successfully",
    data: result,
  });
});

const deleteFamilyMember = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteFamilyMember(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family member deleted successfully",
    data: result,
  });
});


// ==================== 4. BENEFICIARY CATEGORY CONTROLLERS ====================
const createBeneficiaryCategory = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary category created successfully",
    data: result,
  });
});

const getAllBeneficiaryCategories = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryCategories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary categories retrieved successfully",
    data: result,
  });
});

const getBeneficiaryCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryCategoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary category retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryCategory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary category updated successfully",
    data: result,
  });
});

const deleteBeneficiaryCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryCategory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary category deleted successfully",
    data: result,
  });
});


// ==================== 5. BENEFICIARY DOCUMENT CONTROLLERS ====================
const createBeneficiaryDocument = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryDocument(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary document created successfully",
    data: result,
  });
});

const getAllBeneficiaryDocuments = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryDocuments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary documents retrieved successfully",
    data: result,
  });
});

const getBeneficiaryDocumentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryDocumentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary document retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryDocument(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary document updated successfully",
    data: result,
  });
});

const deleteBeneficiaryDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryDocument(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary document deleted successfully",
    data: result,
  });
});


// ==================== 6. BENEFICIARY VERIFICATION CONTROLLERS ====================
const createBeneficiaryVerification = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryVerification(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary verification created successfully",
    data: result,
  });
});

const getAllBeneficiaryVerifications = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryVerifications(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verifications retrieved successfully",
    data: result,
  });
});

const getBeneficiaryVerificationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryVerificationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryVerification(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification updated successfully",
    data: result,
  });
});

const deleteBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryVerification(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification deleted successfully",
    data: result,
  });
});


// ==================== 7. BENEFICIARY NEED ASSESSMENT CONTROLLERS ====================
const createBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryNeedAssessment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary need assessment created successfully",
    data: result,
  });
});

const getAllBeneficiaryNeedAssessments = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryNeedAssessments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessments retrieved successfully",
    data: result,
  });
});

const getBeneficiaryNeedAssessmentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryNeedAssessmentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessment retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryNeedAssessment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessment updated successfully",
    data: result,
  });
});

const deleteBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryNeedAssessment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessment deleted successfully",
    data: result,
  });
});


export const beneficiaryCoreController = {
  // Beneficiary
  createBeneficiary,
  getAllBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
  // BeneficiaryProfile
  createBeneficiaryProfile,
  getAllBeneficiaryProfiles,
  getBeneficiaryProfileById,
  updateBeneficiaryProfile,
  deleteBeneficiaryProfile,
  // FamilyMember
  createFamilyMember,
  getAllFamilyMembers,
  getFamilyMemberById,
  updateFamilyMember,
  deleteFamilyMember,
  // BeneficiaryCategory
  createBeneficiaryCategory,
  getAllBeneficiaryCategories,
  getBeneficiaryCategoryById,
  updateBeneficiaryCategory,
  deleteBeneficiaryCategory,
  // BeneficiaryDocument
  createBeneficiaryDocument,
  getAllBeneficiaryDocuments,
  getBeneficiaryDocumentById,
  updateBeneficiaryDocument,
  deleteBeneficiaryDocument,
  // BeneficiaryVerification
  createBeneficiaryVerification,
  getAllBeneficiaryVerifications,
  getBeneficiaryVerificationById,
  updateBeneficiaryVerification,
  deleteBeneficiaryVerification,
  // BeneficiaryNeedAssessment
  createBeneficiaryNeedAssessment,
  getAllBeneficiaryNeedAssessments,
  getBeneficiaryNeedAssessmentById,
  updateBeneficiaryNeedAssessment,
  deleteBeneficiaryNeedAssessment,
};
