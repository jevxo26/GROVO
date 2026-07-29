import express from "express";
import { branchTypeController } from "../controllers/organization/branchType.controller";

const router = express.Router();

router.post("/", branchTypeController.createBranchType);
router.get("/", branchTypeController.getAllBranchTypes);
router.get("/:id", branchTypeController.getBranchTypeById);
router.patch("/:id", branchTypeController.updateBranchType);
router.delete("/:id", branchTypeController.deleteBranchType);

export const branchTypeRoutes = router;
