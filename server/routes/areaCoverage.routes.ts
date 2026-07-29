import express from "express";
import { areaCoverageController } from "../controllers/location/areaCoverage.controller";

const router = express.Router();

router.post("/", areaCoverageController.createAreaCoverage);
router.get("/", areaCoverageController.getAllAreaCoverages);
router.get("/:id", areaCoverageController.getAreaCoverageById);
router.patch("/:id", areaCoverageController.updateAreaCoverage);
router.delete("/:id", areaCoverageController.deleteAreaCoverage);

export const areaCoverageRoutes = router;
