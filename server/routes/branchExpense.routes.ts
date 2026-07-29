import express from "express";
import { branchExpenseController } from "../controllers/organization/branchExpense.controller";

const router = express.Router();

router.post("/", branchExpenseController.createBranchExpense);
router.get("/", branchExpenseController.getAllBranchExpenses);
router.get("/:id", branchExpenseController.getBranchExpenseById);
router.patch("/:id", branchExpenseController.updateBranchExpense);
router.delete("/:id", branchExpenseController.deleteBranchExpense);

export const branchExpenseRoutes = router;
