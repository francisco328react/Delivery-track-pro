import { Router } from "express";
import { getDashBoardSummary } from "../controllers/dashboardController";
import { ensureAuth } from "../middlewares/ensureAuth";

const router = Router();

router.get("/dashboard", ensureAuth, getDashBoardSummary);

export default router;