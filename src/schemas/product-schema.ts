import { z } from 'zod'

export const productSchema = z.object({
    title: z.string().min(3).max(30),
    price: z.number().min(0.01),
    description: z.string().min(10),
    category: z.string().min(1),
    image: z.string().url()
})

export type ProductFormValues = z.infer<typeof productSchema>