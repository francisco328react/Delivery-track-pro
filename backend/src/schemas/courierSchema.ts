import { z } from 'zod';

export const courierSchema = z.object({
    name: z.string().min(1, "Nome obrigatorio"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    active: z.boolean().optional(),
})

export const updateCourierSchema = courierSchema.partial();