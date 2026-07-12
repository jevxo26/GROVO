import { Router } from "express";
import { LocalizationController } from "../controllers/localization.controller";

const router = Router();

router.post("/currency/rate", LocalizationController.updateExchangeRate);
router.post("/translation/upsert", LocalizationController.setTranslationKey);

export const localizationRouter = router;
