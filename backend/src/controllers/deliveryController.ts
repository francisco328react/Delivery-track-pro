import { Request, Response } from "express";
import { prisma } from "../database/prisma";

// Buscar todas as entregas
export const getAllDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await prisma.delivery.findMany();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar entregas" });
  }
};

// Criar nova entrega
export async function createDelivery(req: Request, res: Response): Promise<void> {
  const { recipient, status } = req.body;

  if (!recipient || !status) {
    res.status(400).json({ error: 'Campos obrigatórios: recipient e status' });
    return;
  }

  try {
    const newDelivery = await prisma.delivery.create({
      data: { recipient, status },
    });

    res.status(201).json(newDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar entrega' });
  }
}