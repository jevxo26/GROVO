import express from "express";
import { projectBeneficiaryController } from "../controllers/project/projectBeneficiary.controller";

const router = express.Router();

router.post("/", projectBeneficiaryController.createProjectBeneficiary);
router.get("/project/:projectId", projectBeneficiaryController.getBeneficiariesByProjectId);
router.get("/:id", projectBeneficiaryController.getProjectBeneficiaryById);
router.patch("/:id", projectBeneficiaryController.updateProjectBeneficiary);
router.delete("/:id", projectBeneficiaryController.deleteProjectBeneficiary);

export const projectBeneficiaryRoutes = router;
