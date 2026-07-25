import express from "express";
import { projectGalleryController } from "../controllers/project/projectGallery.controller";

const router = express.Router();

router.post("/", projectGalleryController.addProjectGalleryMedia);
router.get("/project/:projectId", projectGalleryController.getProjectGalleryByProjectId);
router.get("/:id", projectGalleryController.getProjectGalleryById);
router.patch("/:id", projectGalleryController.updateProjectGallery);
router.delete("/:id", projectGalleryController.deleteProjectGallery);

export const projectGalleryRoutes = router;
