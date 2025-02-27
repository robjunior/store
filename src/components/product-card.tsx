import Image from 'next/image'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const isFeatured = product.rating.rate > 4.5

    return (
        <Card className={`relative overflow-hidden ${isFeatured ? 'border-2 border-primary' : ''}`}>
            {isFeatured && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs z-10">
                    ★ Destaque
                </div>
            )}

            <div className="p-6 space-y-4">
                <div className="relative aspect-square w-full">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority={isFeatured}
                    />
                </div>

                <h3 className="font-semibold truncate" title={product.title}>
                    {product.title}
                </h3>

                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        {product.rating.rate} ({product.rating.count})
                    </div>
                </div>

                <Button asChild variant="outline" className="w-full">
                    <Link href={`/products/${product.id}`}>
                        Ver Detalhes
                    </Link>
                </Button>
            </div>
        </Card>
    )
}