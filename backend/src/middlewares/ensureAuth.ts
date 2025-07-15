import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
  import {authConfig} from "../config/auth";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as JwtPayload;

    req.userId = decoded.id; // Adiciona o id do usuário ao request

    return next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
    return
  }
}
