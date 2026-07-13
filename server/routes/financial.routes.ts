import { Router } from "express";
import { financialController } from "../controllers/financial.controller";

const router = Router();

router.post("/funds/transfer", financialController.transferCapital);
router.post("/payments/verify", financialController.verifyTransaction);
router.post("/reports", financialController.generateFinancialReport);

export const financialRouter = router;
