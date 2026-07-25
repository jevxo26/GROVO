import express from "express";
import { projectExpenseController } from "../controllers/project/projectExpense.controller";

const router = express.Router();

router.post("/", projectExpenseController.createProjectExpense);
router.get("/project/:projectId", projectExpenseController.getProjectExpensesByProjectId);
router.get("/:id", projectExpenseController.getProjectExpenseById);
router.patch("/:id", projectExpenseController.updateProjectExpense);
router.delete("/:id", projectExpenseController.deleteProjectExpense);

export const projectExpenseRoutes = router;
