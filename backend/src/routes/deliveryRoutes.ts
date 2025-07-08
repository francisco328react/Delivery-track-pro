import { Router } from "express";
import { getAllDevliveries } from "../controllers/deliveryController";

const router = Router();

router.get("/deliveries", getAllDevliveries);

export default router;
