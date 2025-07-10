import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios" });
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return
    }

    const token = jwt.sign({ id: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
    return
  }
}
