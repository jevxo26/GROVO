import express from "express";
import { projectController } from "../controllers/project/project.controller";

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/stats", projectController.getProjectStats);
router.get("/code/:code", projectController.getProjectByCode);
router.get("/:id", projectController.getProjectById);
router.patch("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

export const projectRoutes = router;
