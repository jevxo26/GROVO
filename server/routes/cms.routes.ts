import { Router } from "express";
import { cmsController } from "../controllers/cms.controller";

const router = Router();

router.post("/pages/create", cmsController.createPage);
router.post("/stories/publish", cmsController.publishImpactStory);

export const cmsRouter = router;

