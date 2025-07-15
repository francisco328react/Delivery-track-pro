import { z } from "zod";

export const courierSchema = z.object({
    name: z.string().min(3, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().optional(),
    active: z.boolean(),
})

export type CourierFormData = z.infer<typeof courierSchema>;