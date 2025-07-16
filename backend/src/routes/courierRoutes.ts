import { Router } from "express";
import { createCourier, deleteCourier, getAllCouriers, updateCourier, getCourierById } from "../controllers/courierController";
import { ensureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.get("/couriers", ensureAuth, getAllCouriers);
router.get("/couriers/:id", ensureAuth, getCourierById);
router.post("/couriers", ensureAuth, createCourier);
router.put("/couriers/:id", ensureAuth, updateCourier);
router.delete("/couriers/:id", ensureAuth, deleteCourier);

export default router;