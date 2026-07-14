import { Router } from "express";
import { mediaController } from "../controllers/media.controller";

const router = Router();
router.post("/upload/register", mediaController.registerUpload);
router.get("/user/:userId/assets", mediaController.getUserAssets);

export const mediaRouter = router;

