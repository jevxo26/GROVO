import express from "express";
import { unionController } from "../controllers/location/union.controller";

const router = express.Router();

router.post("/", unionController.createUnion);
router.get("/", unionController.getAllUnions);
router.get("/:id", unionController.getUnionById);
router.patch("/:id", unionController.updateUnion);
router.delete("/:id", unionController.deleteUnion);

export const unionRoutes = router;
