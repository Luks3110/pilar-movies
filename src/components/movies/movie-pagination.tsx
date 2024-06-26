import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useFilterStore from '@/hooks/stores/useFilterStore'

export const MoviePagination = () => {
  const { page, totalPages, setPage } = useFilterStore()

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1)
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
