import express from "express";
import { projectTimelineController } from "../controllers/project/projectTimeline.controller";

const router = express.Router();

router.post("/", projectTimelineController.addProjectTimelineEvent);
router.get("/project/:projectId", projectTimelineController.getProjectTimelineByProjectId);
router.get("/:id", projectTimelineController.getProjectTimelineById);
router.patch("/:id", projectTimelineController.updateProjectTimelineEvent);
router.delete("/:id", projectTimelineController.deleteProjectTimelineEvent);

export const projectTimelineRoutes = router;
