import express from "express";
import { territoryAssignmentController } from "../controllers/organization/territoryAssignment.controller";

const router = express.Router();

router.post("/", territoryAssignmentController.createTerritoryAssignment);
router.get("/", territoryAssignmentController.getAllTerritoryAssignments);
router.get("/:id", territoryAssignmentController.getTerritoryAssignmentById);
router.patch("/:id", territoryAssignmentController.updateTerritoryAssignment);
router.delete("/:id", territoryAssignmentController.deleteTerritoryAssignment);

export const territoryAssignmentRoutes = router;
