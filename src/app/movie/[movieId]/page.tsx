import { getQueryClient } from '@/app/get-query-client'
import MovieDetail from '@/components/movie-detail'
import HomeButton from '@/components/ui/home-button'
import { movieOptions } from '@/hooks/queries/movieOptions'
import { getMovieDetails } from '@/services/api/movieDetails'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params: { movieId },
}: {
  params: { movieId: string }
}): Promise<Metadata> {
  const { data } = await getMovieDetails(Number(movieId))
  const castPhotos = data.credits.cast.map((cast) => ({
    url: `https://image.tmdb.org/t/p/original/${cast.profile_path}`,
    alt: `${cast.original_name || cast.name}`,
  }))

  return {
    title: `${data.title}`,
    description: `${data.overview}`,
    openGraph: {
      images: [
        {
          url: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
          alt: `${data.title}`,
        },
        {
          url: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
          alt: `${data.title}`,
        },
        ...castPhotos,
      ],
      siteName: 'Pilar Movies',
      description: `${data.overview}`,
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function MoviePage({
  params: { movieId },
}: {
  params: { movieId: string }
}) {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(movieOptions({ movieId: Number(movieId) }))

  return (
    <main className="flex flex-col justify-between items-center h-screen">
      <header className="absolute top-0 left-5 z-20 flex justify-between items-center w-full h-12 mb-1 pl-1">
        <Link
          href="/"
          className="border border-transparent rounded-md h-full flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]"
        >
          <HomeButton />
        </Link>
      </header>
      <div className="w-full h-full">
        <MovieDetail movieId={Number(movieId)} />
      </div>
    </main>
  )
}
