import express from "express";
import { regionController } from "../controllers/location/region.controller";

const router = express.Router();

router.post("/", regionController.createRegion);
router.get("/", regionController.getAllRegions);
router.get("/:id", regionController.getRegionById);
router.patch("/:id", regionController.updateRegion);
router.delete("/:id", regionController.deleteRegion);

export const regionRoutes = router;
