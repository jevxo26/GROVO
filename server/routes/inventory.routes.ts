import { Router } from "express";
import { inventoryController } from "../controllers/inventory.controller";

const router = Router();

router.post("/stock/update", inventoryController.updateStock);
router.post("/items/distribute", inventoryController.logItemDistribution);

export const inventoryRouter = router;

