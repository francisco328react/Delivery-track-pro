import { Router, Response, Request } from "express";
import { createCourier, deleteCourier, getAllCouriers, updateCourier } from "../controllers/courierController";
import { esureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.get("/couriers", esureAuth, getAllCouriers)
router.post("/couriers", esureAuth, createCourier)
router.put("/couriers/:id", esureAuth, updateCourier)
router.delete("/couriers/:id", esureAuth, deleteCourier)

export default router;