import { MovieList } from '@/components/movie-list'
import { useToast } from '@/components/ui/use-toast'
import useSearch from '@/hooks/queries/useSearch'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { QueryClientWrapper, render, screen } from '..'

jest.mock('@/hooks/stores/useFilterStore')
jest.mock('@/hooks/queries/useSearch')
jest.mock('@/components/ui/use-toast')

describe('MovieList', () => {
  const mockSetSearchType = jest.fn()
  const mockSetTimeWindow = jest.fn()
  const mockToast = jest.fn()

  beforeEach(() => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      search: '',
      searchType: 'normal',
      timeWindow: 'day',
      setSearchType: mockSetSearchType,
      setTimeWindow: mockSetTimeWindow,
    })
    ;(useSearch as jest.Mock).mockReturnValue({
      data: {
        data: {
          results: [{ id: 1, title: 'Movie Title', poster_path: '/path.jpg' }],
        },
      },
      isLoading: false,
      isError: false,
    })
    ;(useToast as jest.Mock).mockReturnValue({ toast: mockToast })
  })
  it('renders without crashing', () => {
    const mockMovieSearchResponse = {
      data: {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [
          {
            id: 1,
            title: 'Movie Title',
            poster_path: '/path.jpg',
            vote_average: 8.5,
            backdrop_path: '/backdrop_path.jpg',
            original_title: 'Original Movie Title',
            overview: 'Overview of the movie',
            media_type: 'movie',
            genre_ids: [1, 2],
            popularity: 10.0,
            release_date: '2020-01-01',
            video: false,
            vote_count: 200,
            adult: false,
            original_language: 'en',
          },
        ],
      },
    }
    ;(useSearch as jest.Mock).mockReturnValue({
      data: { ...mockMovieSearchResponse },
      isLoading: false,
      isError: false,
    })
    render(
      <QueryClientWrapper>
        <MovieList />
      </QueryClientWrapper>,
    )
    expect(screen.getByText('Movie Title')).toBeInTheDocument()
  })

  it('displays loading state correctly', () => {
    ;(useSearch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    })
    render(
      <QueryClientWrapper>
        <MovieList />
      </QueryClientWrapper>,
    )
    expect(screen.getByTestId('loading-movie-skeleton')).toBeInTheDocument()
  })

  it('displays error state and shows toast message', () => {
    ;(useSearch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    })
    render(
      <QueryClientWrapper>
        <MovieList />
      </QueryClientWrapper>,
    )
    expect(mockToast).toHaveBeenCalledWith({
      description: 'Erro ao carregar os filmes, tente novamente mais tarde',
      type: 'background',
      duration: 3000,
      title: 'Algo deu errado',
    })
  })
})
