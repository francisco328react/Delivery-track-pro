import { Router, Request, Response } from "express";
import * as DeliveryController from "../controllers/deliveryController";

const router = Router();

// Rota de listagem
router.get("/deliveries", DeliveryController.getAllDeliveries);

// Rota de criação
router.post("/deliveries", (req: Request, res: Response) => {
  DeliveryController.createDelivery(req, res);
});

export default router;