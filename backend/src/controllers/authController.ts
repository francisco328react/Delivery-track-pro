import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import authConfig from "../config/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adminEmail = "admin@gmail.com";
  const adminPassword = "987123456";

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const jwtOptions: SignOptions = {
    expiresIn: authConfig.jwt.expiresIn,    
  }

  const token = jwt.sign(
    { email }, 
    authConfig.jwt.secret as string,
    jwtOptions
  );

  return res.json({ token });
};
