import { z } from 'zod'

export const productSchema = z.object({
    title: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(30, 'Nome nao pode exceder 30 caracteres'),
    price: z.number().min(0.01, 'Preço deve ser maior que 0'),
    description: z.string().min(10, 'Descricão deve ter pelo menos 10 caracteres'),
    category: z.string().min(1, 'Selecione uma categoria'),
    image: z.string().url('URL da imagem inválida')
})

export type ProductFormValues = z.infer<typeof productSchema>