'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductFormValues, productSchema } from '@/schemas/product-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useTransition } from 'react'
import { createProductAction } from '@/actions/product-actions'
import { useParams } from 'next/navigation'

interface ProductFormProps {
    initialData?: ProductFormValues
}

export function ProductForm({ initialData }: ProductFormProps) {
    const params = useParams()
    const [isPending, startTransition] = useTransition()
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            title: '',
            price: 0,
            description: '',
            category: '',
            image: ''
        }
    })

    const onSubmit = (values: ProductFormValues) => {
        startTransition(async () => {
            try {
                if (!params.id) throw new Error('ID do produto não encontrado')
                await createProductAction(params.id as string, values)
                form.reset()
            } catch (error) {
                console.error('Erro ao atualizar:', error)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Produto</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={e => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/products">Cancelar</Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}