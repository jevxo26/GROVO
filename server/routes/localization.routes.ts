import { Router } from "express";
import { localizationController } from "../controllers/localization.controller";

const router = Router();

router.post("/currency/rate", localizationController.updateExchangeRate);
router.post("/translation/upsert", localizationController.setTranslationKey);

export const localizationRouter = router;

