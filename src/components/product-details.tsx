import { Product } from '@/types/product'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProductDetailsProps {
    product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div className="container mx-auto p-4">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-square">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-2xl font-bold">${product.price}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                    </div>
                    <p className="text-muted-foreground">{product.description}</p>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href={`/products/${product.id}/edit`}>Editar</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/products">Voltar para a lista</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}