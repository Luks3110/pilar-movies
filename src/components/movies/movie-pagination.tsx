import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useFilterStore from '@/hooks/stores/useFilterStore'

export const MoviePagination = () => {
  const { page, setPage } = useFilterStore()

  const handleNext = () => {
    setPage(page + 1)
  }

  const handlePrevious = () => {
    setPage(page - 1)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
