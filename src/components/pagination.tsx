'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface PaginationProps {
    currentPage: number
    totalPages: number
    searchParams: Record<string, string>
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
    const router = useRouter()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}
        </div>
    )
}