import { Router } from "express";
import { beneficiaryCoreController } from "../controllers/beneficiary_controller/beneficiaryCore.controller";
import { beneficiaryReliefController } from "../controllers/beneficiary_controller/beneficiaryRelief.controller";
import { beneficiaryDistributionController } from "../controllers/beneficiary_controller/beneficiaryDistribution.controller";

const router = Router();

// Core Beneficiary Routes
router.post("/beneficiaries", beneficiaryCoreController.createBeneficiary);
router.get("/beneficiaries", beneficiaryCoreController.getAllBeneficiaries);
router.post(
  "/beneficiary-profiles",
  beneficiaryCoreController.createBeneficiaryProfile,
);
router.post("/family-members", beneficiaryCoreController.createFamilyMember);
router.post(
  "/beneficiary-categories",
  beneficiaryCoreController.createBeneficiaryCategory,
);
router.post(
  "/beneficiary-documents",
  beneficiaryCoreController.createBeneficiaryDocument,
);
router.post(
  "/beneficiary-verifications",
  beneficiaryCoreController.createBeneficiaryVerification,
);
router.post(
  "/beneficiary-need-assessments",
  beneficiaryCoreController.createBeneficiaryNeedAssessment,
);

// Relief Packages & Campaigns
router.post(
  "/relief-packages",
  beneficiaryReliefController.createReliefPackage,
);
router.post("/relief-items", beneficiaryReliefController.createReliefItem);
router.post(
  "/distribution-campaigns",
  beneficiaryReliefController.createDistributionCampaign,
);
router.post(
  "/distribution-schedules",
  beneficiaryReliefController.createDistributionSchedule,
);
router.post(
  "/distribution-centers",
  beneficiaryReliefController.createDistributionCenter,
);
router.post(
  "/beneficiary-qr-codes",
  beneficiaryReliefController.createBeneficiaryQRCode,
);

// Distribution Records, Verification & Follow-up
router.post(
  "/distribution-records",
  beneficiaryDistributionController.createDistributionRecord,
);
router.post(
  "/distribution-items",
  beneficiaryDistributionController.createDistributionItem,
);
router.post(
  "/distribution-verifications",
  beneficiaryDistributionController.createDistributionVerification,
);
router.post(
  "/acknowledgements",
  beneficiaryDistributionController.createAcknowledgement,
);
router.post(
  "/beneficiary-feedbacks",
  beneficiaryDistributionController.createBeneficiaryFeedback,
);
router.post(
  "/follow-up-visits",
  beneficiaryDistributionController.createFollowUpVisit,
);
router.post(
  "/case-histories",
  beneficiaryDistributionController.createCaseHistory,
);
router.post(
  "/beneficiary-activity-logs",
  beneficiaryDistributionController.createBeneficiaryActivityLog,
);

export const beneficiaryRoutes = router;
