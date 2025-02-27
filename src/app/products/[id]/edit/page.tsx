import { ProductForm } from '@/components/product-form'
import { ProductService } from '@/services/product-service'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
    params,
}: {
    params: { id: string }
}) {
    const product = await ProductService.getProduct(params.id)

    const handleSubmit = async (values: any) => {
        'use server'
        try {
            await ProductService.updateProduct(params.id, values)
            return { success: true, message: 'Produto atualizado com sucesso!' }
        } catch (error) {
            return { success: false, message: 'Erro ao atualizar produto' }
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Editar Produto</h1>
            <ProductForm initialData={product} onSubmit={handleSubmit} />
        </div>
    )
}