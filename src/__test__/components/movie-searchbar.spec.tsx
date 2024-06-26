import MovieSearchbar from '@/components/movie-searchbar'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { fireEvent, render, screen, waitFor } from '..'

jest.mock('@/hooks/stores/useFilterStore')

describe('MovieSearchbar', () => {
  const mockSetSearch = jest.fn()
  const mockSetSearchType = jest.fn()
  const mockSetPage = jest.fn()

  beforeEach(() => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      search: '',
      searchType: 'normal',
      setSearch: mockSetSearch,
      setSearchType: mockSetSearchType,
      setPage: mockSetPage,
    })
  })

  it('renders without crashing', () => {
    render(<MovieSearchbar />)
    expect(
      screen.getByPlaceholderText('Procure por filmes...'),
    ).toBeInTheDocument()
  })

  it('updates search input correctly', async () => {
    render(<MovieSearchbar />)
    const input = screen.getByPlaceholderText('Procure por filmes...')
    fireEvent.change(input, { target: { value: 'Matrix' } })
    await waitFor(() => expect(mockSetSearch).toHaveBeenCalledWith('Matrix'))
  })

  it('toggles search type to trending when trending button is clicked', () => {
    render(<MovieSearchbar />)
    const trendingButton = screen.getByText('Trending')
    fireEvent.click(trendingButton)
    expect(mockSetSearchType).toHaveBeenCalledWith('trending')
  })

  it('toggles search type to popular when popular button is clicked', () => {
    render(<MovieSearchbar />)
    const popularButton = screen.getByText('Popular')
    fireEvent.click(popularButton)
    expect(mockSetSearchType).toHaveBeenCalledWith('popular')
  })
})
