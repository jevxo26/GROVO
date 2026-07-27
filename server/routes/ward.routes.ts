import express from "express";
import { wardController } from "../controllers/location/ward.controller";

const router = express.Router();

router.post("/", wardController.createWard);
router.get("/", wardController.getAllWards);
router.get("/:id", wardController.getWardById);
router.patch("/:id", wardController.updateWard);
router.delete("/:id", wardController.deleteWard);

export const wardRoutes = router;
