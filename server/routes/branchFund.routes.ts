import express from "express";
import { branchFundController } from "../controllers/organization/branchFund.controller";

const router = express.Router();

router.post("/", branchFundController.createBranchFund);
router.get("/", branchFundController.getAllBranchFunds);
router.get("/:id", branchFundController.getBranchFundById);
router.patch("/:id", branchFundController.updateBranchFund);
router.delete("/:id", branchFundController.deleteBranchFund);

export const branchFundRoutes = router;
