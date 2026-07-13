import { Router } from "express";
import { MediaController } from "../controllers/media.controller";

const router = Router();
router.post("/upload/register", MediaController.registerUpload);
router.get("/user/:userId/assets", MediaController.getUserAssets);

export const mediaRouter = router;
