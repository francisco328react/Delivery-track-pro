import { z } from "zod";

export const deliverySchema = z.object({
    recipient: z.string().min(3,"Nome do destinatário obrigatório"),
    status: z.enum(["pendente", "em trânsito", "entregue"]),
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;