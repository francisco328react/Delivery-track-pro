import { prisma } from "../database/prisma";
import { Response, Request } from "express";

export async function getDashBoardSummary(req: Request, res: Response): Promise<void> {
    try {
        const totalDeliveries = await prisma.delivery.count();
        const totalCouriers = await prisma.courier.count();
        const activeCouriers = await prisma.courier.count({ where: { active: true } });
        const inactiveCouriers = await prisma.courier.count({ where: { active: false } });

        res.json({
            totalDeliveries,
            totalCouriers,
            activeCouriers,
            inactiveCouriers
        });

        return

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar dados no dashboard" });
    }
}