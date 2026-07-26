import express from "express";
import { organizationProfileController } from "../controllers/organization/organizationProfile.controller";

const router = express.Router();

router.post("/", organizationProfileController.createOrganizationProfile);
router.get("/organization/:organizationId", organizationProfileController.getOrganizationProfileByOrgId);
router.get("/:id", organizationProfileController.getOrganizationProfileById);
router.patch("/:id", organizationProfileController.updateOrganizationProfile);
router.delete("/:id", organizationProfileController.deleteOrganizationProfile);

export const organizationProfileRoutes = router;
