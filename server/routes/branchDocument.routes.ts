import express from "express";
import { branchDocumentController } from "../controllers/organization/branchDocument.controller";

const router = express.Router();

router.post("/", branchDocumentController.createBranchDocument);
router.get("/", branchDocumentController.getAllBranchDocuments);
router.get("/:id", branchDocumentController.getBranchDocumentById);
router.patch("/:id", branchDocumentController.updateBranchDocument);
router.delete("/:id", branchDocumentController.deleteBranchDocument);

export const branchDocumentRoutes = router;
