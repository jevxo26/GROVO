import express from "express";
import { branchAuditController } from "../controllers/organization/branchAudit.controller";

const router = express.Router();

router.post("/", branchAuditController.createBranchAudit);
router.get("/", branchAuditController.getAllBranchAudits);
router.get("/:id", branchAuditController.getBranchAuditById);
router.patch("/:id", branchAuditController.updateBranchAudit);
router.delete("/:id", branchAuditController.deleteBranchAudit);

export const branchAuditRoutes = router;
