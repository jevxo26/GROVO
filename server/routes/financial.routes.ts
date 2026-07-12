import { Router } from "express";
import { FinancialController } from "../controllers/financial.controller";

const router = Router();

router.post("/funds/transfer", FinancialController.transferCapital);
router.post("/payments/verify", FinancialController.verifyTransaction);

export const financialRouter = router;
