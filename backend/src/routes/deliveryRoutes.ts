import { Router } from "express";
import { getAllDeliveries, createDelivery, updateDelivey, deleteDelivery } from "../controllers/deliveryController";
import { ensureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.get("/deliveries", ensureAuth, getAllDeliveries);
router.post("/deliveries", ensureAuth, createDelivery);
router.put("/deliveries", ensureAuth, updateDelivey);
router.delete("/deliveries", ensureAuth, deleteDelivery);

export default router;