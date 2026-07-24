import express from "express";
import { projectBudgetController } from "../controllers/project/projectBudget.controller";

const router = express.Router();

router.post("/", projectBudgetController.createProjectBudget);
router.get("/project/:projectId", projectBudgetController.getProjectBudgetByProjectId);
router.get("/:id", projectBudgetController.getProjectBudgetById);
router.patch("/:id", projectBudgetController.updateProjectBudget);
router.delete("/:id", projectBudgetController.deleteProjectBudget);

export const projectBudgetRoutes = router;
