import { ProductList } from '@/components/product-list'
import { ProductService } from '@/services/product-service'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produtos - Fake Store CRUD',
  description: 'Gerencie seus produtos com nosso sistema CRUD completo',
}

interface ProductsPageProps {
  searchParams: {
    page?: string
    category?: string
    sort?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = Number(searchParams.page) || 1
  const category = searchParams.category
  const sort = searchParams.sort === 'asc' || searchParams.sort === 'desc'
    ? searchParams.sort
    : undefined

  try {
    const { products, total } = await ProductService.getProducts({
      page,
      category,
      sort,
    })

    return (
      <main className="container mx-auto p-4" >
        <h1 className="text-3xl font-bold mb-8" > Catálogo de Produtos </h1>
        < ProductList
          products={products}
          total={total}
          currentPage={page}
          searchParams={searchParams}
        />
      </main>
    )
  } catch (error) {
    console.error('Failed to load products:', error)

    return (
      <div className="container mx-auto p-4 text-center" >
        <h2 className="text-2xl font-bold text-destructive mb-4" >
          Erro ao carregar produtos
        </h2>
        < p className="text-muted-foreground" >
          Por favor, tente recarregar a página ou verifique sua conexão
        </p>
      </div>
    )
  }
}