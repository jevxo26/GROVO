import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";

const router = Router();

router.post("/stock/update", InventoryController.updateStock);
router.post("/items/distribute", InventoryController.logItemDistribution);

export const inventoryRouter = router;
