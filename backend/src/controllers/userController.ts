import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";

export async function createUser(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Campos obrigatórios: name, email e password" });
    return
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email já está em uso" });
      return
    }
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}
