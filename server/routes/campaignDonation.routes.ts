import express from "express";
import { campaignDonationController } from "../controllers/campaign/campaignDonation.controller";

const router = express.Router();

router.post("/", campaignDonationController.recordDonation);
router.get(
  "/campaign/:campaignId",
  campaignDonationController.getDonationsByCampaignId,
);
router.get(
  "/donor/:donorId",
  campaignDonationController.getDonationsByDonorId,
);
router.get("/:id", campaignDonationController.getDonationById);
router.patch(
  "/:id/status",
  campaignDonationController.updateDonationPaymentStatus,
);

export const campaignDonationRoutes = router;
