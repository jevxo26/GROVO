import express from "express";
import { paymentGatewayController } from "../controllers/payment/paymentGateway.controller";

const router = express.Router();

router.post("/", paymentGatewayController.createPaymentGateway);
router.get("/", paymentGatewayController.getAllPaymentGateways);
router.get("/:id", paymentGatewayController.getPaymentGatewayById);
router.patch("/:id", paymentGatewayController.updatePaymentGateway);
router.delete("/:id", paymentGatewayController.deletePaymentGateway);

export const paymentGatewayRoutes = router;
