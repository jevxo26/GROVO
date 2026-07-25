import express from "express";
import { financialReportController } from "../controllers/payment/financialReport.controller";

const router = express.Router();

router.post("/", financialReportController.generateFinancialReport);
router.get("/", financialReportController.getAllFinancialReports);
router.get("/:id", financialReportController.getFinancialReportById);
router.delete("/:id", financialReportController.deleteFinancialReport);

export const financialReportRoutes = router;
