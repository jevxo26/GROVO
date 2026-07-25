import express from "express";
import { projectVolunteerController } from "../controllers/project/projectVolunteer.controller";

const router = express.Router();

router.post("/", projectVolunteerController.assignProjectVolunteer);
router.get("/project/:projectId", projectVolunteerController.getVolunteersByProjectId);
router.get("/volunteer", projectVolunteerController.getProjectVolunteersByVolunteerId);
router.get("/volunteer/:volunteerId", projectVolunteerController.getProjectVolunteersByVolunteerId);
router.get("/:id", projectVolunteerController.getProjectVolunteerById);
router.patch("/:id", projectVolunteerController.updateProjectVolunteer);
router.delete("/:id", projectVolunteerController.removeProjectVolunteer);

export const projectVolunteerRoutes = router;
