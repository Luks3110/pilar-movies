import { MovieList } from '@/components/movie-list'
import { getMovies } from '@/services/api/search'
import { QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pilar Movies',
  description: 'Pilar Movies',
}

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['normalSearch', { search: '', searchType: '', timeWindow: '' }],
    queryFn: async () => getMovies({ search: '' }),
  })

  return (
    <main>
      <MovieList />
    </main>
  )
}
