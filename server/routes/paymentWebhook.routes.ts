import express from "express";
import { paymentWebhookController } from "../controllers/payment/paymentWebhook.controller";

const router = express.Router();

router.post("/", paymentWebhookController.recordPaymentWebhook);
router.get("/", paymentWebhookController.getAllPaymentWebhooks);
router.get("/payment/:paymentId", paymentWebhookController.getWebhooksByPaymentId);
router.get("/:id", paymentWebhookController.getPaymentWebhookById);
router.patch("/:id/status", paymentWebhookController.updateWebhookVerificationStatus);
router.delete("/:id", paymentWebhookController.deletePaymentWebhook);

export const paymentWebhookRoutes = router;
