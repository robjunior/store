'use client'

import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={currentPage === i + 1 ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  )
}