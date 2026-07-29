import express from "express";
import { organizationHierarchyController } from "../controllers/organization/organizationHierarchy.controller";

const router = express.Router();

router.post("/", organizationHierarchyController.createHierarchyNode);
router.get("/", organizationHierarchyController.getAllHierarchyNodes);
router.get("/:id", organizationHierarchyController.getHierarchyNodeById);
router.patch("/:id", organizationHierarchyController.updateHierarchyNode);
router.delete("/:id", organizationHierarchyController.deleteHierarchyNode);

export const organizationHierarchyRoutes = router;
