import express from "express";
import { donationItemController } from "../controllers/donation/donationItem.controller";

const router = express.Router();

router.post("/", donationItemController.createDonationItem);
router.get("/donation/:donationId", donationItemController.getDonationItemsByDonationId);
router.get("/fund/:fundId", donationItemController.getDonationItemsByFundId);
router.get("/:id", donationItemController.getDonationItemById);
router.patch("/:id", donationItemController.updateDonationItem);
router.delete("/:id", donationItemController.deleteDonationItem);

export const donationItemRoutes = router;
