'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

const categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
]

export function ProductFilters({ searchParams }: { searchParams: Record<string, string> }) {
    const router = useRouter()

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="flex flex-wrap gap-4 mb-8">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {searchParams.category || 'Todas Categorias'}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleFilter('category', '')}>
                        Todas
                    </DropdownMenuItem>
                    {categories.map(category => (
                        <DropdownMenuItem
                            key={category}
                            onClick={() => handleFilter('category', category)}
                        >
                            {category}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Button
                variant="outline"
                onClick={() => handleFilter('sort', searchParams.sort === 'asc' ? 'desc' : 'asc')}
            >
                Preço: {searchParams.sort === 'asc' ? 'Menor → Maior' : 'Maior → Menor'}
            </Button>
        </div>
    )
}