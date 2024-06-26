import { MoviePagination } from '@/components/movies/movie-pagination'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { fireEvent, render, screen } from '../..'

jest.mock('@/hooks/stores/useFilterStore')

describe('MoviePagination', () => {
  const mockAddPage = jest.fn()
  const mockRemovePage = jest.fn()
  const mockSetPage = jest.fn()
  const mockSetTotalPages = jest.fn()

  beforeEach(() => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      page: 1,
      totalPages: 5,
      addPage: mockAddPage,
      removePage: mockRemovePage,
      setPage: mockSetPage,
      setTotalPages: mockSetTotalPages,
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
    expect(mockAddPage).toHaveBeenCalled()
  })

  it('calls setPage with previous page on previous button click', () => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      page: 2,
      removePage: mockRemovePage,
    })
    render(<MoviePagination />)
    fireEvent.click(screen.getByTestId('pagination-previous'))
    expect(mockRemovePage).toHaveBeenCalled()
  })
})
