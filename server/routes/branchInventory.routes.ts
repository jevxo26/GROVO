import express from "express";
import { branchInventoryController } from "../controllers/organization/branchInventory.controller";

const router = express.Router();

router.post("/", branchInventoryController.createBranchInventory);
router.get("/", branchInventoryController.getAllBranchInventories);
router.get("/:id", branchInventoryController.getBranchInventoryById);
router.patch("/:id", branchInventoryController.updateBranchInventory);
router.delete("/:id", branchInventoryController.deleteBranchInventory);

export const branchInventoryRoutes = router;
