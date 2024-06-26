import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useFilterStore from '@/hooks/stores/useFilterStore'

export const MoviePagination = () => {
  const { page, totalPages, addPage, removePage } = useFilterStore()

  const handleNext = () => {
    if (page && totalPages && page < totalPages) {
      addPage()
    }
  }

  const handlePrevious = () => {
    if (page && page > 1) {
      removePage()
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
        >
          <PaginationPrevious
            onClick={handlePrevious}
            data-testid="pagination-previous"
          />
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNext} data-testid="pagination-next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
