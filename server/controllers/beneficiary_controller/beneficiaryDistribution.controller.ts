import status from "http-status";
import { beneficiaryDistributionService } from "../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 13. DISTRIBUTION RECORD CONTROLLERS ====================
const createDistributionRecord = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionRecord(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution record created successfully",
    data: result,
  });
});

const getAllDistributionRecords = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllDistributionRecords(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution records retrieved successfully",
    data: result,
  });
});

const getDistributionRecordById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getDistributionRecordById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution record retrieved successfully",
    data: result,
  });
});

const updateDistributionRecord = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateDistributionRecord(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution record updated successfully",
    data: result,
  });
});

const deleteDistributionRecord = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteDistributionRecord(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution record deleted successfully",
    data: result,
  });
});


// ==================== 14. DISTRIBUTION ITEM CONTROLLERS ====================
const createDistributionItem = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionItem(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution item created successfully",
    data: result,
  });
});

const getAllDistributionItems = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllDistributionItems(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution items retrieved successfully",
    data: result,
  });
});

const getDistributionItemById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getDistributionItemById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution item retrieved successfully",
    data: result,
  });
});

const updateDistributionItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateDistributionItem(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution item updated successfully",
    data: result,
  });
});

const deleteDistributionItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteDistributionItem(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution item deleted successfully",
    data: result,
  });
});


// ==================== 16. DISTRIBUTION VERIFICATION CONTROLLERS ====================
const createDistributionVerification = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionVerification(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution verification created successfully",
    data: result,
  });
});

const getAllDistributionVerifications = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllDistributionVerifications(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verifications retrieved successfully",
    data: result,
  });
});

const getDistributionVerificationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getDistributionVerificationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verification retrieved successfully",
    data: result,
  });
});

const updateDistributionVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateDistributionVerification(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verification updated successfully",
    data: result,
  });
});

const deleteDistributionVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteDistributionVerification(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verification deleted successfully",
    data: result,
  });
});


// ==================== 17. ACKNOWLEDGEMENT CONTROLLERS ====================
const createAcknowledgement = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createAcknowledgement(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Acknowledgement created successfully",
    data: result,
  });
});

const getAllAcknowledgements = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllAcknowledgements(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgements retrieved successfully",
    data: result,
  });
});

const getAcknowledgementById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getAcknowledgementById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgement retrieved successfully",
    data: result,
  });
});

const updateAcknowledgement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateAcknowledgement(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgement updated successfully",
    data: result,
  });
});

const deleteAcknowledgement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteAcknowledgement(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Acknowledgement deleted successfully",
    data: result,
  });
});


// ==================== 18. BENEFICIARY FEEDBACK CONTROLLERS ====================
const createBeneficiaryFeedback = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createBeneficiaryFeedback(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary feedback created successfully",
    data: result,
  });
});

const getAllBeneficiaryFeedbacks = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllBeneficiaryFeedbacks(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedbacks retrieved successfully",
    data: result,
  });
});

const getBeneficiaryFeedbackById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getBeneficiaryFeedbackById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedback retrieved successfully",
    data: result,
  });
});

const updateBeneficiaryFeedback = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateBeneficiaryFeedback(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedback updated successfully",
    data: result,
  });
});

const deleteBeneficiaryFeedback = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteBeneficiaryFeedback(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedback deleted successfully",
    data: result,
  });
});


// ==================== 19. FOLLOW UP VISIT CONTROLLERS ====================
const createFollowUpVisit = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createFollowUpVisit(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Follow-up visit created successfully",
    data: result,
  });
});

const getAllFollowUpVisits = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllFollowUpVisits(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visits retrieved successfully",
    data: result,
  });
});

const getFollowUpVisitById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getFollowUpVisitById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visit retrieved successfully",
    data: result,
  });
});

const updateFollowUpVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateFollowUpVisit(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visit updated successfully",
    data: result,
  });
});

const deleteFollowUpVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteFollowUpVisit(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Follow-up visit deleted successfully",
    data: result,
  });
});


// ==================== 20. CASE HISTORY CONTROLLERS ====================
const createCaseHistory = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createCaseHistory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Case history created successfully",
    data: result,
  });
});

const getAllCaseHistories = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllCaseHistories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case histories retrieved successfully",
    data: result,
  });
});

const getCaseHistoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getCaseHistoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case history retrieved successfully",
    data: result,
  });
});

const updateCaseHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateCaseHistory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case history updated successfully",
    data: result,
  });
});

const deleteCaseHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteCaseHistory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case history deleted successfully",
    data: result,
  });
});


// ==================== 21. BENEFICIARY ACTIVITY LOG CONTROLLERS ====================
const createBeneficiaryActivityLog = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createBeneficiaryActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary activity log created successfully",
    data: result,
  });
});

const getAllBeneficiaryActivityLogs = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllBeneficiaryActivityLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary activity logs retrieved successfully",
    data: result,
  });
});

const getBeneficiaryActivityLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getBeneficiaryActivityLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary activity log retrieved successfully",
    data: result,
  });
});

const deleteBeneficiaryActivityLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteBeneficiaryActivityLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary activity log deleted successfully",
    data: result,
  });
});


export const beneficiaryDistributionController = {
  // DistributionRecord
  createDistributionRecord,
  getAllDistributionRecords,
  getDistributionRecordById,
  updateDistributionRecord,
  deleteDistributionRecord,
  // DistributionItem
  createDistributionItem,
  getAllDistributionItems,
  getDistributionItemById,
  updateDistributionItem,
  deleteDistributionItem,
  // DistributionVerification
  createDistributionVerification,
  getAllDistributionVerifications,
  getDistributionVerificationById,
  updateDistributionVerification,
  deleteDistributionVerification,
  // Acknowledgement
  createAcknowledgement,
  getAllAcknowledgements,
  getAcknowledgementById,
  updateAcknowledgement,
  deleteAcknowledgement,
  // BeneficiaryFeedback
  createBeneficiaryFeedback,
  getAllBeneficiaryFeedbacks,
  getBeneficiaryFeedbackById,
  updateBeneficiaryFeedback,
  deleteBeneficiaryFeedback,
  // FollowUpVisit
  createFollowUpVisit,
  getAllFollowUpVisits,
  getFollowUpVisitById,
  updateFollowUpVisit,
  deleteFollowUpVisit,
  // CaseHistory
  createCaseHistory,
  getAllCaseHistories,
  getCaseHistoryById,
  updateCaseHistory,
  deleteCaseHistory,
  // BeneficiaryActivityLog
  createBeneficiaryActivityLog,
  getAllBeneficiaryActivityLogs,
  getBeneficiaryActivityLogById,
  deleteBeneficiaryActivityLog,
};
