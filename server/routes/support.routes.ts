import { Router } from "express";
import { supportController } from "../controllers/support.controller";

const router = Router();

router.post("/tickets/open", supportController.openTicket);
router.post("/tickets/reply", supportController.submitReply);

export const supportRouter = router;

