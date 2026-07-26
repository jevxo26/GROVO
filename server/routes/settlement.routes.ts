import express from "express";
import { settlementController } from "../controllers/payment/settlement.controller";

const router = express.Router();

router.post("/", settlementController.createSettlement);
router.get("/", settlementController.getAllSettlements);
router.get("/gateway/:paymentGatewayId", settlementController.getSettlementsByGatewayId);
router.get("/:id", settlementController.getSettlementById);
router.patch("/:id/status", settlementController.updateSettlementStatus);
router.delete("/:id", settlementController.deleteSettlement);

export const settlementRoutes = router;
