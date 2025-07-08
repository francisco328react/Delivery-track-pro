import { Router, Response, Request } from "express";
import * as CourierController from "../controllers/courierController";

const router = Router();

router.post("/couriers", (req: Request, res: Response) => {
  CourierController.createCourier(req, res);
});

export default router;