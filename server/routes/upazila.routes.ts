import express from "express";
import { upazilaController } from "../controllers/location/upazila.controller";

const router = express.Router();

router.post("/", upazilaController.createUpazila);
router.get("/", upazilaController.getAllUpazilas);
router.get("/:id", upazilaController.getUpazilaById);
router.patch("/:id", upazilaController.updateUpazila);
router.delete("/:id", upazilaController.deleteUpazila);

export const upazilaRoutes = router;
