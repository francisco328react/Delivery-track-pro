import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createCourier = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    if(!name || !email) {
        return res.status(400).json({ error: "Campos Obrigatórios: name e email"})
    }

    try {
        const newCourier = await prisma.courier.create({
            data: { name, email }
        })

        res.status(201).json(newCourier);
    } catch (error: any) {
        console.error(error);

        if(error.code === "P2002") {
            return res.status(400).json({ error: "Email já cadastrado!" })
        }

        res.status(500).json({ error: "Erro ao criar entregador" });
    }
}