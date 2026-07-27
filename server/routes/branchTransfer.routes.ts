import express from "express";
import { branchTransferController } from "../controllers/organization/branchTransfer.controller";

const router = express.Router();

router.post("/", branchTransferController.createBranchTransfer);
router.get("/", branchTransferController.getAllBranchTransfers);
router.get("/:id", branchTransferController.getBranchTransferById);
router.patch("/:id", branchTransferController.updateBranchTransfer);
router.delete("/:id", branchTransferController.deleteBranchTransfer);

export const branchTransferRoutes = router;
