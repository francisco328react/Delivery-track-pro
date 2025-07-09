import { Router, Response, Request } from "express";
import { createCourier, getAllCouriers } from "../controllers/courierController";
import { esureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.get("/couriers", esureAuth, getAllCouriers)
router.post("/couriers", esureAuth, createCourier)

export default router;