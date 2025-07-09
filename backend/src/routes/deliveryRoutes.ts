import { Router, Request, Response } from "express";
import { getAllDeliveries, createDelivery } from "../controllers/deliveryController";
import { esureAuth } from "../middlewares/ensureAuth";

const router = Router();

// Rota de listagem
router.get("/deliveries", getAllDeliveries);

// Rota de criação
router.post("/deliveries", esureAuth, createDelivery);

export default router;