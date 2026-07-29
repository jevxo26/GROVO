import express from "express";
import { divisionController } from "../controllers/location/division.controller";

const router = express.Router();

router.post("/", divisionController.createDivision);
router.get("/", divisionController.getAllDivisions);
router.get("/:id", divisionController.getDivisionById);
router.patch("/:id", divisionController.updateDivision);
router.delete("/:id", divisionController.deleteDivision);

export const divisionRoutes = router;
