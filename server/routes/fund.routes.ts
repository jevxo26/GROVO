import express from "express";
import { fundController } from "../controllers/donation/fund.controller";

const router = express.Router();

router.post("/", fundController.createFund);
router.get("/", fundController.getAllFunds);
router.get("/:id", fundController.getFundById);
router.patch("/:id", fundController.updateFund);
router.delete("/:id", fundController.deleteFund);

export const fundRoutes = router;
