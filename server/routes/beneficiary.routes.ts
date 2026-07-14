import { Router } from "express";
import { beneficiaryController } from "../controllers/beneficiary.controller";

const router = Router();

router.post("/", beneficiaryController.registerBeneficiary);
router.post("/assessment", beneficiaryController.logNeedAssessment);
router.post("/distributions/:id/verify", beneficiaryController.verifyDistribution);
router.post("/distributions/:id/acknowledge", beneficiaryController.acknowledgeDistribution);
router.post("/admin/relief-packages", beneficiaryController.createReliefPackage);
router.post("/admin/distribution-campaigns", beneficiaryController.createDistributionCampaign);
router.post("/:id/follow-ups", beneficiaryController.createFollowUpVisit);
router.get("/:id", beneficiaryController.getBeneficiaryDetail);

// Legacy
router.post("/register", beneficiaryController.registerBeneficiary);

export const beneficiaryRouter = router;
