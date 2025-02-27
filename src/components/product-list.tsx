'use client'

import { Product } from '@/types/product'
import { ProductCard } from '@/components/product-card'
import { Pagination } from '@/components/pagination'
import { ProductFilters } from '@/components/product-filters'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductListProps {
    products: Product[]
    total: number
    currentPage: number
    searchParams: Record<string, string>
}

const ITEMS_PER_PAGE = 3

export function ProductList({ products, total, currentPage, searchParams }: ProductListProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`/products?${params.toString()}`)
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <ProductFilters searchParams={searchParams} />

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">Nenhum produto encontrado</h2>
                    <p className="text-muted-foreground mt-2">
                        Tente ajustar os filtros de pesquisa
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    )
}