import express from "express";
import { payoutController } from "../controllers/payment/payout.controller";

const router = express.Router();

router.post("/", payoutController.createPayout);
router.get("/", payoutController.getAllPayouts);
router.get("/project/:projectId", payoutController.getPayoutsByProjectId);
router.get("/:id", payoutController.getPayoutById);
router.patch("/:id/status", payoutController.updatePayoutStatus);
router.delete("/:id", payoutController.deletePayout);

export const payoutRoutes = router;
