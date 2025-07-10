import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const getAllDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await prisma.delivery.findMany();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar entregas" });
  }
};

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

export async function updateDelivey(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { recipient, status } = req.body;

  try {
    const updateDelivey = await prisma.delivery.update({
      where: { id },
      data: { recipient, status },
    })

    res.status(200).json(updateDelivey);
  } catch (error: any) {
    console.error(error);

    if(error.code === "P2025") {
      res.status(404).json({ error: "Entrega não encontrada" });
      return
    }

    res.status(500).json({ error: "Error ao autalizar entrega" });
  }
}

export async function deleteDelivery(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    await prisma.delivery.delete({
      where: { id },
    })

    res.status(204).send();
  } catch (error: any) {
    console.error(error);

    if(error.code === "P2025") {
      res.status(404).json({ error: "Entrega não entregada" });
    }

    res.status(500).json({ error: "Erro ao deletar entrega" });
  }
}