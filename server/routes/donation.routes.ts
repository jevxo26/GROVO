import express from "express";
import { masterDonationController } from "../controllers/donation/donation.controller";

const router = express.Router();

router.post("/", masterDonationController.createDonation);
router.get("/", masterDonationController.getAllDonations);
router.get("/stats", masterDonationController.getDonationStats);
router.get("/number/:number", masterDonationController.getDonationByNumber);
router.get("/:id", masterDonationController.getDonationById);
router.patch("/:id", masterDonationController.updateDonation);
router.delete("/:id", masterDonationController.deleteDonation);

export const masterDonationRoutes = router;
