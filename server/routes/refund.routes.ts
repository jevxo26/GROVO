import express from "express";
import { refundController } from "../controllers/payment/refund.controller";

const router = express.Router();

router.post("/", refundController.createRefundRequest);
router.get("/", refundController.getAllRefunds);
router.get("/payment/:paymentId", refundController.getRefundsByPaymentId);
router.get("/:id", refundController.getRefundById);
router.patch("/:id/status", refundController.updateRefundStatus);
router.delete("/:id", refundController.deleteRefund);

export const refundRoutes = router;
