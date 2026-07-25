import express from "express";
import { paymentLogController } from "../controllers/payment/paymentLog.controller";

const router = express.Router();

router.post("/", paymentLogController.recordPaymentLog);
router.get("/", paymentLogController.getAllPaymentLogs);
router.get("/payment/:paymentId", paymentLogController.getPaymentLogsByPaymentId);
router.get("/:id", paymentLogController.getPaymentLogById);
router.delete("/:id", paymentLogController.deletePaymentLog);

export const paymentLogRoutes = router;
