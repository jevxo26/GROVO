import { Router } from "express";
import { CMSController } from "../controllers/cms.controller";

const router = Router();

router.post("/pages/create", CMSController.createPage);
router.post("/stories/publish", CMSController.publishImpactStory);

export const cmsRouter = router;
