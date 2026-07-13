import { Router } from "express";
import { BeneficiaryController } from "../controllers/beneficiary.controller";

const router = Router();

router.post("/register", BeneficiaryController.registerBeneficiary);
router.post("/assessment", BeneficiaryController.logNeedAssessment);

export const beneficiaryRouter = router;
