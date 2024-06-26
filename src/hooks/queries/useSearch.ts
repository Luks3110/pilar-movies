import { MovieSearchParams } from '@/lib/types/search'
import {
  getMovies,
  getPopularMovies,
  getTrendingMovies,
} from '@/services/api/search'
import { useQuery } from '@tanstack/react-query'

const useSearch = ({
  search,
  searchType = 'normal',
  timeWindow,
  page = 1,
}: MovieSearchParams) => {
  switch (searchType) {
    case 'normal':
      return useQuery({
        queryKey: ['normalSearch', { search, searchType, timeWindow, page }],
        queryFn: () => getMovies({ search, page }),
      })
    case 'trending':
      return useQuery({
        queryKey: ['trendingSearch', { search, searchType, timeWindow, page }],
        queryFn: async () => getTrendingMovies({ search, timeWindow, page }),
      })
    case 'popular':
      return useQuery({
        queryKey: ['popularSearch', { search, searchType, timeWindow, page }],
        queryFn: async () => getPopularMovies({ search, page }),
      })
  }
}

export default useSearch
