import express from "express";
import { projectReportController } from "../controllers/project/projectReport.controller";

const router = express.Router();

router.post("/", projectReportController.createProjectReport);
router.get("/project/:projectId", projectReportController.getProjectReportsByProjectId);
router.get("/:id", projectReportController.getProjectReportById);
router.patch("/:id", projectReportController.updateProjectReport);
router.delete("/:id", projectReportController.deleteProjectReport);

export const projectReportRoutes = router;
