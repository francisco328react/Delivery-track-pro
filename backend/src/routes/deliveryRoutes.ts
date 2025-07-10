import { Router } from "express";
import { getAllDeliveries, createDelivery, updateDelivey, deleteDelivery } from "../controllers/deliveryController";
import { esureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.get("/deliveries", getAllDeliveries);
router.post("/deliveries", esureAuth, createDelivery);
router.put("/deliveries", esureAuth, updateDelivey);
router.delete("/deliveries", esureAuth, deleteDelivery);

export default router;