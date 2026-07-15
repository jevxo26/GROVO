import { Router } from "express";
import { supportController } from "../controllers/support.controller";

const router = Router();

// Legacy / Skeletons
router.post("/tickets/open", supportController.openTicket);
router.post("/tickets/reply", supportController.submitReply);

// REST
router.post("/tickets", supportController.openTicket);
router.post("/tickets/:id/replies", supportController.submitReply);
router.get("/tickets/my", supportController.listMyTickets);
router.get("/tickets/:id", supportController.getTicketDetail);

export const supportRouter = router;

