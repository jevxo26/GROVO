import express from "express";
import { projectCategoryController } from "../controllers/project/projectCategory.controller";

const router = express.Router();

router.post("/", projectCategoryController.createProjectCategory);
router.get("/", projectCategoryController.getAllProjectCategories);
router.get("/:id", projectCategoryController.getProjectCategoryById);
router.patch("/:id", projectCategoryController.updateProjectCategory);
router.delete("/:id", projectCategoryController.deleteProjectCategory);

export const projectCategoryRoutes = router;
