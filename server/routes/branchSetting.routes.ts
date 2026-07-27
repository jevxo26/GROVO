import express from "express";
import { branchSettingController } from "../controllers/organization/branchSetting.controller";

const router = express.Router();

router.post("/", branchSettingController.createOrUpdateBranchSetting);
router.patch("/branch/:branchId", branchSettingController.createOrUpdateBranchSetting);
router.get("/branch/:branchId", branchSettingController.getBranchSettingByBranchId);
router.delete("/branch/:branchId", branchSettingController.deleteBranchSetting);

export const branchSettingRoutes = router;
