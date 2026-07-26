import express from "express";
import { paymentTransactionController } from "../controllers/payment/paymentTransaction.controller";

const router = express.Router();

router.post("/", paymentTransactionController.recordPaymentTransaction);
router.get("/", paymentTransactionController.getAllPaymentTransactions);
router.get("/payment/:paymentId", paymentTransactionController.getTransactionsByPaymentId);
router.get("/:id", paymentTransactionController.getPaymentTransactionById);
router.delete("/:id", paymentTransactionController.deletePaymentTransaction);

export const paymentTransactionRoutes = router;
