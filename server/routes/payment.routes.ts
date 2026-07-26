import express from "express";
import { paymentController } from "../controllers/payment/payment.controller";

const router = express.Router();

router.post("/", paymentController.initiatePayment);
router.get("/", paymentController.getAllPayments);
router.get("/donation/:donationId", paymentController.getPaymentsByDonationId);
router.get("/transaction/:transactionId", paymentController.getPaymentByTransactionId);
router.get("/:id", paymentController.getPaymentById);
router.patch("/:id/status", paymentController.updatePaymentStatus);
router.delete("/:id", paymentController.deletePayment);

export const paymentRoutes = router;
