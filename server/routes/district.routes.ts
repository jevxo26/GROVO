import express from "express";
import { districtController } from "../controllers/location/district.controller";

const router = express.Router();

router.post("/", districtController.createDistrict);
router.get("/", districtController.getAllDistricts);
router.get("/:id", districtController.getDistrictById);
router.patch("/:id", districtController.updateDistrict);
router.delete("/:id", districtController.deleteDistrict);

export const districtRoutes = router;
