import { Router, Response, Request } from "express";
import * as AuthController from "../controllers/authController";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
    AuthController.login(req, res);
});

export default router;