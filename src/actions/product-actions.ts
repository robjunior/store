'use server'

import { ProductService } from '@/services/product-service'
import { ProductFormValues } from '@/schemas/product-schema'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export const createProductAction = async (data: ProductFormValues) => {
    try {
        await ProductService.createProduct(data)
        toast.success('Produto criado com sucesso!')
    } catch (error) {
        toast.error('Falha ao criar produto')
        throw error
    }
    redirect('/products')
}