import express from "express";
import { donationTypeController } from "../controllers/donation/donationType.controller";

const router = express.Router();

router.post("/", donationTypeController.createDonationType);
router.get("/", donationTypeController.getAllDonationTypes);
router.get("/:id", donationTypeController.getDonationTypeById);
router.patch("/:id", donationTypeController.updateDonationType);
router.delete("/:id", donationTypeController.deleteDonationType);

export const donationTypeRoutes = router;
