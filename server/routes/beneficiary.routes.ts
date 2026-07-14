import { Router } from "express";
import { beneficiaryController } from "../controllers/beneficiary.controller";

const router = Router();

router.post("/register", beneficiaryController.registerBeneficiary);
router.post("/assessment", beneficiaryController.logNeedAssessment);

export const beneficiaryRouter = router;

