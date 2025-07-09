import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import authConfig from "../config/auth";

export function esureAuth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.status(401).json({ error: "Toke não informado" });
        return
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token Invalido" });
        return
    }
}