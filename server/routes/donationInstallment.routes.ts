import express from "express";
import { donationInstallmentController } from "../controllers/donation/donationInstallment.controller";

const router = express.Router();

router.post("/", donationInstallmentController.generateInstallment);
router.get(
  "/schedule/:scheduleId",
  donationInstallmentController.getInstallmentsByScheduleId,
);
router.get("/:id", donationInstallmentController.getDonationInstallmentById);
router.patch("/:id", donationInstallmentController.updateInstallmentStatus);
router.delete("/:id", donationInstallmentController.deleteDonationInstallment);

export const donationInstallmentRoutes = router;
