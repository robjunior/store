import axios from 'axios'
import { Product, ProductFilters } from '@/types/product'
import { ProductFormValues } from '@/schemas/product-schema'

const API_BASE = 'https://fakestoreapi.com'

export class ProductService {
    static async getProducts(params: ProductFilters = {}) {
        try {
            const response = await axios.get<Product[]>(`${API_BASE}/products`, { params })
            return {
                products: response.data,
                total: 100
            }
        } catch (error) {
            throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } 
    }

    static async getProduct(id: string) {
        try {
            const response = await axios.get<Product>(`${API_BASE}/products/${id}`)
            return response.data
        } catch (error) {
            throw new Error(`Failed to fetch product details: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    static async createProduct(data: ProductFormValues): Promise<Product> {
        try {
            const response = await axios.post<Product>(`${API_BASE}/products`, data)
            return response.data
        } catch (error) {
            throw new Error(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }
    static async updateProduct(id: string, data: Partial<Product>) {
        try {
            const response = await axios.put<Product>(`${API_BASE}/products/${id}`, data)
            return response.data
        } catch (error) {
            throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    static async deleteProduct(id: string) {
        try {
            await axios.delete(`${API_BASE}/products/${id}`)
        } catch (error) {
            throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }
}