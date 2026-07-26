import express from "express";
import { invoiceController } from "../controllers/payment/invoice.controller";

const router = express.Router();

router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.getAllInvoices);
router.get("/donor", invoiceController.getInvoicesByDonorId);
router.get("/donor/:donorId", invoiceController.getInvoicesByDonorId);
router.get("/number/:invoiceNumber", invoiceController.getInvoiceByNumber);
router.get("/:id", invoiceController.getInvoiceById);
router.patch("/:id/status", invoiceController.updateInvoiceStatus);
router.delete("/:id", invoiceController.deleteInvoice);

export const invoiceRoutes = router;
