import { ProductService } from '@/services/product-service'
import { notFound } from 'next/navigation'
import { ProductDetails } from '@/components/product-details'

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string }
}) {
    try {
        const product = await ProductService.getProduct(params.id)
        return <ProductDetails product={product} />
    } catch (error) {
        return notFound()
    }
}