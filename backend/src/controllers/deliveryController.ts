import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export async function getAllDevliveries(req: Request, res: Response) {
    try {
        const deliveries = await prisma.findMany();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar entregas" });
    }
}