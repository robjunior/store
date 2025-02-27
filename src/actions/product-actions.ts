'use server'

import { ProductService } from '@/services/product-service'
import { ProductFormValues } from '@/schemas/product-schema'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export const createProductAction = async (values: ProductFormValues) => {
    try {
        await ProductService.createProduct(values)
        toast.success('Produto criado com sucesso!')
        redirect('/products')
    } catch (error) {
        toast.error('Erro ao criar produto')
        console.error(error)
        return { error: 'Erro ao criar produto' }
    }
}