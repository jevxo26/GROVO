import { Router } from "express";
import { SupportController } from "../controllers/support.controller";

const router = Router();

router.post("/tickets/open", SupportController.openTicket);
router.post("/tickets/reply", SupportController.submitReply);

export const supportRouter = router;
