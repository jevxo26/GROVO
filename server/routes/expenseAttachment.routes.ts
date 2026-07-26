import express from "express";
import { expenseAttachmentController } from "../controllers/project/expenseAttachment.controller";

const router = express.Router();

router.post("/", expenseAttachmentController.addExpenseAttachment);
router.get("/expense/:expenseId", expenseAttachmentController.getAttachmentsByExpenseId);
router.get("/:id", expenseAttachmentController.getExpenseAttachmentById);
router.delete("/:id", expenseAttachmentController.deleteExpenseAttachment);

export const expenseAttachmentRoutes = router;
