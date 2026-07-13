import { Router } from "express";
import { donorsController } from "../controllers/donors.controller";

const router = Router();

router.post("/register", donorsController.registerDonor);
router.post("/corporate", donorsController.registerCorporateDonor);
router.post("/subscriptions", donorsController.createSubscription);
router.get("/my-subscriptions", donorsController.getSubscriptions);
router.post("/commitments", donorsController.createCommitment);
router.get("/my-wallet", donorsController.getWallet);
router.get("/my-recognitions", donorsController.getRecognitions);
router.put("/preferences", donorsController.updatePreferences);
router.get("/csr-report", donorsController.getCsrReport);

// Admin listing
router.get("/", donorsController.listDonors);

export const donorsRouter = router;
