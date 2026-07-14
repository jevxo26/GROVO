import { Router } from "express";
import { securityController } from "../controllers/security.controller";

const router = Router();

router.post("/network/whitelist", securityController.whitelistIp);
router.post("/incidents/flag", securityController.flagIncident);

export const securityRouter = router;

