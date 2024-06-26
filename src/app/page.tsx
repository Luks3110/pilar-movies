import { MovieList } from '@/components/movie-list'
import MovieSearchbar from '@/components/movie-searchbar'
import LoadingSpinner from '@/components/ui/loading-spinner'
import {
  getMovies,
  getPopularMovies,
  getTrendingMovies,
} from '@/services/api/search'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Pilar Movies',
  description: 'Pilar Movies',
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()

  const movieFilterStore = JSON.parse(
    searchParams
      ? JSON.parse((searchParams['movie-filter-store'] as string) || '{}')
      : {},
  )

  await queryClient.prefetchQuery({
    queryKey: [
      'normalSearch',
      {
        search: movieFilterStore.search,
        searchType: movieFilterStore.searchType,
        timeWindow: movieFilterStore.timeWindow,
      },
    ],
    queryFn: async () => getMovies({ search: '' }),
  })

  await queryClient.prefetchQuery({
    queryKey: [
      'normalSearch',
      {
        search: movieFilterStore.search,
        searchType: movieFilterStore.searchType,
        timeWindow: movieFilterStore.timeWindow,
      },
    ],
    queryFn: async () => getTrendingMovies({ search: '' }),
  })

  await queryClient.prefetchQuery({
    queryKey: [
      'normalSearch',
      {
        search: movieFilterStore.search,
        searchType: movieFilterStore.searchType,
        timeWindow: movieFilterStore.timeWindow,
      },
    ],
    queryFn: async () => getPopularMovies({}),
  })

  return (
    <main>
      <header className="bg-background px-4 py-3 shadow-sm">
        <div className="container mx-auto flex items-center">
          <MovieSearchbar />
        </div>
      </header>
      <Suspense fallback={<LoadingSpinner />}>
        <MovieList />
      </Suspense>
    </main>
  )
}
