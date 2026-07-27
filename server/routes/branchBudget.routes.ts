import express from "express";
import { branchBudgetController } from "../controllers/organization/branchBudget.controller";

const router = express.Router();

router.post("/", branchBudgetController.createBranchBudget);
router.get("/", branchBudgetController.getAllBranchBudgets);
router.get("/:id", branchBudgetController.getBranchBudgetById);
router.patch("/:id", branchBudgetController.updateBranchBudget);
router.delete("/:id", branchBudgetController.deleteBranchBudget);

export const branchBudgetRoutes = router;
