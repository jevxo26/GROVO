import express from "express";
import { organizationController } from "../controllers/organization/organization.controller";

const router = express.Router();

router.post("/", organizationController.createOrganization);
router.get("/", organizationController.getAllOrganizations);
router.get("/:id", organizationController.getOrganizationById);
router.patch("/:id", organizationController.updateOrganization);
router.delete("/:id", organizationController.deleteOrganization);

export const organizationRoutes = router;
