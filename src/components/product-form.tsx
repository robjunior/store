'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductFormValues, productSchema } from '@/schemas/product-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ProductFormProps {
    initialData?: ProductFormValues
    onSubmit: (values: ProductFormValues) => Promise<void>
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
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
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button variant="outline" type="button">
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    )
}