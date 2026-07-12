import { Router } from "express";
import { SecurityController } from "../controllers/security.controller";

const router = Router();

router.post("/network/whitelist", SecurityController.whitelistIp);
router.post("/incidents/flag", SecurityController.flagIncident);

export const securityRouter = router;
