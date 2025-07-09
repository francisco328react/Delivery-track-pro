import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const getAllCouriers = async (req: Request, res: Response) => {
  try {
    const couriers = await prisma.courier.findMany();
    res.status(200).json(couriers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar entregas" });
  }
};

export async function createCourier(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;

    if(!name || !email) {
        res.status(400).json({ error: "Campos Obrigatórios: name e email"})
        return
    }

    try {
        const newCourier = await prisma.courier.create({
            data: { name, email }
        })

        res.status(201).json(newCourier);
        return
    } catch (error: any) {
        console.error(error);

        if(error.code === "P2002") {
            res.status(400).json({ error: "Email já cadastrado!" })
            return
        }

        res.status(500).json({ error: "Erro ao criar entregador" });
    }
}