'use client'

import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { ProductService } from '@/services/product-service'
import { toast } from 'sonner'

interface DeleteProductButtonProps {
    productId: string
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const router = useRouter()

    const handleDelete = async () => {
        toast.promise(
            ProductService.deleteProduct(productId),
            {
                loading: 'Excluindo produto...',
                success: () => {
                    router.push('/products')
                    return 'Produto excluído com sucesso!'
                },
                error: (error) => {
                    console.error(error)
                    return 'Erro ao excluir produto'
                }
            }
        )
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Excluir</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. O produto será permanentemente excluído.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}