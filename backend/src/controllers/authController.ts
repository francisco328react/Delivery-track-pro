import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {authConfig} from "../config/auth";

export async function login(req: Request, res: Response): Promise<void> {
  console.log("REQ BODY", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Usuário encontrado:", user);

    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      authConfig.jwt.secret as string,
      { expiresIn: authConfig.jwt.expiresIn }
    );

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
}
