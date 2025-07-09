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

export async function createCourier(
  req: Request,
  res: Response
): Promise<void> {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: "Campos Obrigatórios: name e email" });
    return;
  }

  try {
    const newCourier = await prisma.courier.create({
      data: { name, email, ...(phone && { phone }) }
    });

    res.status(201).json(newCourier);
    return;
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      res.status(400).json({ error: "Email já cadastrado!" });
      return;
    }

    res.status(500).json({ error: "Erro ao criar entregador" });
  }
}

export async function updateCourier(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { name, email, phone, active } = req.body;

  const data: any = [];
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (phone !== undefined) data.phone = phone;
  if (active !== undefined) data.active = active;

  try {
    const updatedCourier = await prisma.courier.update({
      where: { id },
      data
    });

    res.status(200).json(updatedCourier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar entregador" });
  }
}

export async function deleteCourier(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    await prisma.courier.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar entregador" });
  }
}