import { MoviePagination } from '@/components/movies/movie-pagination'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { fireEvent, render, screen } from '../..'

jest.mock('@/hooks/stores/useFilterStore')

describe('MoviePagination', () => {
  const mockSetPage = jest.fn()

  beforeEach(() => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      page: 1,
      totalPages: 5,
      setPage: mockSetPage,
    })
  })

  it('renders pagination component', () => {
    render(<MoviePagination />)
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
  })

  it('calls setPage with next page on next button click', () => {
    render(<MoviePagination />)
    fireEvent.click(screen.getByTestId('pagination-next'))
    expect(mockSetPage).toHaveBeenCalledWith(2)
  })

  it('calls setPage with previous page on previous button click', () => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      page: 2,
      setPage: mockSetPage,
    })
    render(<MoviePagination />)
    fireEvent.click(screen.getByTestId('pagination-previous'))
    expect(mockSetPage).toHaveBeenCalledWith(1)
  })
})
