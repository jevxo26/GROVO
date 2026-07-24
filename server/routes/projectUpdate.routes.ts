import express from "express";
import { projectUpdateController } from "../controllers/project/projectUpdate.controller";

const router = express.Router();

router.post("/", projectUpdateController.createProjectUpdate);
router.get("/project/:projectId", projectUpdateController.getProjectUpdatesByProjectId);
router.get("/:id", projectUpdateController.getProjectUpdateById);
router.patch("/:id", projectUpdateController.updateProjectUpdate);
router.delete("/:id", projectUpdateController.deleteProjectUpdate);

export const projectUpdateRoutes = router;
