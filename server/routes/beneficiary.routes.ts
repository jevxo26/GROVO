import { Router } from "express";
import { beneficiaryCoreController } from "../controllers/beneficiary_controller/beneficiaryCore.controller";
import { beneficiaryReliefController } from "../controllers/beneficiary_controller/beneficiaryRelief.controller";
import { beneficiaryDistributionController } from "../controllers/beneficiary_controller/beneficiaryDistribution.controller";

const router = Router();

// ==================== 1. BENEFICIARY CORE ROUTES ====================
// 1. Beneficiary
router.post("/beneficiaries", beneficiaryCoreController.createBeneficiary);
router.get("/beneficiaries", beneficiaryCoreController.getAllBeneficiaries);
router.get("/beneficiaries/:id", beneficiaryCoreController.getBeneficiaryById);
router.patch("/beneficiaries/:id", beneficiaryCoreController.updateBeneficiary);
router.delete("/beneficiaries/:id", beneficiaryCoreController.deleteBeneficiary);

// 2. BeneficiaryProfile
router.post("/beneficiary-profiles", beneficiaryCoreController.createBeneficiaryProfile);
router.get("/beneficiary-profiles", beneficiaryCoreController.getAllBeneficiaryProfiles);
router.get("/beneficiary-profiles/:id", beneficiaryCoreController.getBeneficiaryProfileById);
router.patch("/beneficiary-profiles/:id", beneficiaryCoreController.updateBeneficiaryProfile);
router.delete("/beneficiary-profiles/:id", beneficiaryCoreController.deleteBeneficiaryProfile);

// 3. FamilyMember
router.post("/family-members", beneficiaryCoreController.createFamilyMember);
router.get("/family-members", beneficiaryCoreController.getAllFamilyMembers);
router.get("/family-members/:id", beneficiaryCoreController.getFamilyMemberById);
router.patch("/family-members/:id", beneficiaryCoreController.updateFamilyMember);
router.delete("/family-members/:id", beneficiaryCoreController.deleteFamilyMember);

// 4. BeneficiaryCategory
router.post("/beneficiary-categories", beneficiaryCoreController.createBeneficiaryCategory);
router.get("/beneficiary-categories", beneficiaryCoreController.getAllBeneficiaryCategories);
router.get("/beneficiary-categories/:id", beneficiaryCoreController.getBeneficiaryCategoryById);
router.patch("/beneficiary-categories/:id", beneficiaryCoreController.updateBeneficiaryCategory);
router.delete("/beneficiary-categories/:id", beneficiaryCoreController.deleteBeneficiaryCategory);

// 5. BeneficiaryDocument
router.post("/beneficiary-documents", beneficiaryCoreController.createBeneficiaryDocument);
router.get("/beneficiary-documents", beneficiaryCoreController.getAllBeneficiaryDocuments);
router.get("/beneficiary-documents/:id", beneficiaryCoreController.getBeneficiaryDocumentById);
router.patch("/beneficiary-documents/:id", beneficiaryCoreController.updateBeneficiaryDocument);
router.delete("/beneficiary-documents/:id", beneficiaryCoreController.deleteBeneficiaryDocument);

// 6. BeneficiaryVerification
router.post("/beneficiary-verifications", beneficiaryCoreController.createBeneficiaryVerification);
router.get("/beneficiary-verifications", beneficiaryCoreController.getAllBeneficiaryVerifications);
router.get("/beneficiary-verifications/:id", beneficiaryCoreController.getBeneficiaryVerificationById);
router.patch("/beneficiary-verifications/:id", beneficiaryCoreController.updateBeneficiaryVerification);
router.delete("/beneficiary-verifications/:id", beneficiaryCoreController.deleteBeneficiaryVerification);

// 7. BeneficiaryNeedAssessment
router.post("/beneficiary-need-assessments", beneficiaryCoreController.createBeneficiaryNeedAssessment);
router.get("/beneficiary-need-assessments", beneficiaryCoreController.getAllBeneficiaryNeedAssessments);
router.get("/beneficiary-need-assessments/:id", beneficiaryCoreController.getBeneficiaryNeedAssessmentById);
router.patch("/beneficiary-need-assessments/:id", beneficiaryCoreController.updateBeneficiaryNeedAssessment);
router.delete("/beneficiary-need-assessments/:id", beneficiaryCoreController.deleteBeneficiaryNeedAssessment);


// ==================== 2. RELIEF PACKAGES & CAMPAIGNS ROUTES ====================
// 8. ReliefPackage
router.post("/relief-packages", beneficiaryReliefController.createReliefPackage);
router.get("/relief-packages", beneficiaryReliefController.getAllReliefPackages);
router.get("/relief-packages/:id", beneficiaryReliefController.getReliefPackageById);
router.patch("/relief-packages/:id", beneficiaryReliefController.updateReliefPackage);
router.delete("/relief-packages/:id", beneficiaryReliefController.deleteReliefPackage);

// 9. ReliefItem
router.post("/relief-items", beneficiaryReliefController.createReliefItem);
router.get("/relief-items", beneficiaryReliefController.getAllReliefItems);
router.get("/relief-items/:id", beneficiaryReliefController.getReliefItemById);
router.patch("/relief-items/:id", beneficiaryReliefController.updateReliefItem);
router.delete("/relief-items/:id", beneficiaryReliefController.deleteReliefItem);

// 10. DistributionCampaign
router.post("/distribution-campaigns", beneficiaryReliefController.createDistributionCampaign);
router.get("/distribution-campaigns", beneficiaryReliefController.getAllDistributionCampaigns);
router.get("/distribution-campaigns/:id", beneficiaryReliefController.getDistributionCampaignById);
router.patch("/distribution-campaigns/:id", beneficiaryReliefController.updateDistributionCampaign);
router.delete("/distribution-campaigns/:id", beneficiaryReliefController.deleteDistributionCampaign);

// 11. DistributionSchedule
router.post("/distribution-schedules", beneficiaryReliefController.createDistributionSchedule);
router.get("/distribution-schedules", beneficiaryReliefController.getAllDistributionSchedules);
router.get("/distribution-schedules/:id", beneficiaryReliefController.getDistributionScheduleById);
router.patch("/distribution-schedules/:id", beneficiaryReliefController.updateDistributionSchedule);
router.delete("/distribution-schedules/:id", beneficiaryReliefController.deleteDistributionSchedule);

// 12. DistributionCenter
router.post("/distribution-centers", beneficiaryReliefController.createDistributionCenter);
router.get("/distribution-centers", beneficiaryReliefController.getAllDistributionCenters);
router.get("/distribution-centers/:id", beneficiaryReliefController.getDistributionCenterById);
router.patch("/distribution-centers/:id", beneficiaryReliefController.updateDistributionCenter);
router.delete("/distribution-centers/:id", beneficiaryReliefController.deleteDistributionCenter);

// 15. BeneficiaryQRCode
router.post("/beneficiary-qr-codes", beneficiaryReliefController.createBeneficiaryQRCode);
router.get("/beneficiary-qr-codes", beneficiaryReliefController.getAllBeneficiaryQRCodes);
router.get("/beneficiary-qr-codes/:id", beneficiaryReliefController.getBeneficiaryQRCodeById);
router.patch("/beneficiary-qr-codes/:id", beneficiaryReliefController.updateBeneficiaryQRCode);
router.delete("/beneficiary-qr-codes/:id", beneficiaryReliefController.deleteBeneficiaryQRCode);


// ==================== 3. DISTRIBUTION RECORDS & FEEDBACK ROUTES ====================
// 13. DistributionRecord
router.post("/distribution-records", beneficiaryDistributionController.createDistributionRecord);
router.get("/distribution-records", beneficiaryDistributionController.getAllDistributionRecords);
router.get("/distribution-records/:id", beneficiaryDistributionController.getDistributionRecordById);
router.patch("/distribution-records/:id", beneficiaryDistributionController.updateDistributionRecord);
router.delete("/distribution-records/:id", beneficiaryDistributionController.deleteDistributionRecord);

// 14. DistributionItem
router.post("/distribution-items", beneficiaryDistributionController.createDistributionItem);
router.get("/distribution-items", beneficiaryDistributionController.getAllDistributionItems);
router.get("/distribution-items/:id", beneficiaryDistributionController.getDistributionItemById);
router.patch("/distribution-items/:id", beneficiaryDistributionController.updateDistributionItem);
router.delete("/distribution-items/:id", beneficiaryDistributionController.deleteDistributionItem);

// 16. DistributionVerification
router.post("/distribution-verifications", beneficiaryDistributionController.createDistributionVerification);
router.get("/distribution-verifications", beneficiaryDistributionController.getAllDistributionVerifications);
router.get("/distribution-verifications/:id", beneficiaryDistributionController.getDistributionVerificationById);
router.patch("/distribution-verifications/:id", beneficiaryDistributionController.updateDistributionVerification);
router.delete("/distribution-verifications/:id", beneficiaryDistributionController.deleteDistributionVerification);

// 17. Acknowledgement
router.post("/acknowledgements", beneficiaryDistributionController.createAcknowledgement);
router.get("/acknowledgements", beneficiaryDistributionController.getAllAcknowledgements);
router.get("/acknowledgements/:id", beneficiaryDistributionController.getAcknowledgementById);
router.patch("/acknowledgements/:id", beneficiaryDistributionController.updateAcknowledgement);
router.delete("/acknowledgements/:id", beneficiaryDistributionController.deleteAcknowledgement);

// 18. BeneficiaryFeedback
router.post("/beneficiary-feedbacks", beneficiaryDistributionController.createBeneficiaryFeedback);
router.get("/beneficiary-feedbacks", beneficiaryDistributionController.getAllBeneficiaryFeedbacks);
router.get("/beneficiary-feedbacks/:id", beneficiaryDistributionController.getBeneficiaryFeedbackById);
router.patch("/beneficiary-feedbacks/:id", beneficiaryDistributionController.updateBeneficiaryFeedback);
router.delete("/beneficiary-feedbacks/:id", beneficiaryDistributionController.deleteBeneficiaryFeedback);

// 19. FollowUpVisit
router.post("/follow-up-visits", beneficiaryDistributionController.createFollowUpVisit);
router.get("/follow-up-visits", beneficiaryDistributionController.getAllFollowUpVisits);
router.get("/follow-up-visits/:id", beneficiaryDistributionController.getFollowUpVisitById);
router.patch("/follow-up-visits/:id", beneficiaryDistributionController.updateFollowUpVisit);
router.delete("/follow-up-visits/:id", beneficiaryDistributionController.deleteFollowUpVisit);

// 20. CaseHistory
router.post("/case-histories", beneficiaryDistributionController.createCaseHistory);
router.get("/case-histories", beneficiaryDistributionController.getAllCaseHistories);
router.get("/case-histories/:id", beneficiaryDistributionController.getCaseHistoryById);
router.patch("/case-histories/:id", beneficiaryDistributionController.updateCaseHistory);
router.delete("/case-histories/:id", beneficiaryDistributionController.deleteCaseHistory);

// 21. BeneficiaryActivityLog
router.post("/beneficiary-activity-logs", beneficiaryDistributionController.createBeneficiaryActivityLog);
router.get("/beneficiary-activity-logs", beneficiaryDistributionController.getAllBeneficiaryActivityLogs);
router.get("/beneficiary-activity-logs/:id", beneficiaryDistributionController.getBeneficiaryActivityLogById);
router.delete("/beneficiary-activity-logs/:id", beneficiaryDistributionController.deleteBeneficiaryActivityLog);

export const beneficiaryRoutes = router;
