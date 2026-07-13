import { Router } from "express";
import { donationController } from "../controllers/donation.controller";

const router = Router();

router.post("/", donationController.processDonation);
router.post("/payments/webhook/:gateway", donationController.handlePaymentWebhook);
router.get("/my-donations", donationController.getMyDonations);
router.get("/:id/receipt", donationController.getReceipt);
router.post("/:id/refund", donationController.requestRefund);
router.get("/payment-gateways", donationController.getPaymentGateways);
router.post("/settlements", donationController.createSettlement);

export const donationRouter = router;
