import { ProductForm } from '@/components/product-form'
import { createProductAction } from '@/actions/product-actions'

export default function AddProductPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Adicionar Produto</h1>
            <ProductForm action={createProductAction} />
        </div>
    )
}