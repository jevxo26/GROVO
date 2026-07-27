import express from "express";
import { branchController } from "../controllers/organization/branch.controller";

const router = express.Router();

router.post("/", branchController.createBranch);
router.get("/", branchController.getAllBranches);
router.get("/organization/:organizationId", branchController.getBranchesByOrgId);
router.get("/:id", branchController.getBranchById);
router.patch("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

export const branchRoutes = router;
