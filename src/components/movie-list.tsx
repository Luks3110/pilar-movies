'use client'

import { useEffect, useMemo } from 'react'

import useSearch from '@/hooks/queries/useSearch'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { timeWindowsOptions } from '@/lib/constants/timeWindowsOptions'
import { TimeWindow } from '@/lib/types/filter'
import AnimatedMovieCard from './movies/animated-movie-card'
import { MoviePagination } from './movies/movie-pagination'
import SearchSwitch from './movies/search-switch'
import LoadingSpinner from './ui/loading-spinner'
import { useToast } from './ui/use-toast'

export function MovieList() {
  const { search, searchType, timeWindow, page, setTimeWindow, setTotalPages } =
    useFilterStore()

  const {
    data: movies,
    isLoading,
    isError,
  } = useSearch({
    search,
    page,
    searchType,
    timeWindow,
  })

  const handleTimeWindow = (newTimeWindow: TimeWindow) => {
    setTimeWindow(newTimeWindow)
  }

  const { toast } = useToast()

  useEffect(() => {
    if (isError) {
      toast({
        description: 'Erro ao carregar os filmes, tente novamente mais tarde',
        type: 'background',
        duration: 3000,
        title: 'Algo deu errado',
      })
    }
  }, [isError])

  const filteredMovies = useMemo(
    () => movies?.data?.results.filter((movie) => !!movie.poster_path),
    [movies, movies?.data],
  )

  const normalOrTrending = useMemo(
    () => ['trending', 'normal'].includes(searchType || ''),
    [searchType],
  )

  useEffect(() => {
    if (movies?.data?.total_pages) {
      setTotalPages(movies.data.total_pages)
    }
  }, [movies])

  return (
    <>
      <div
        className={`flex w-full gap-6 justify-center flex-col sm:flex-row sm:justify-between p-6 ${
          searchType !== 'trending' ? 'md:grid-cols-1' : 'md:grid-cols-4'
        }`}
      >
        <SearchSwitch
          searchType={searchType || ''}
          timeWindow={timeWindow || ''}
          handleTimeWindow={handleTimeWindow}
          timeWindowsOptions={timeWindowsOptions}
        />
        <div>
          <div
            className={`flex flex-col justify-center items-center md:col-span-4 lg:col-span-6 sm:grid md:grid-cols-3 lg:grid-cols-5 ${!normalOrTrending ? 'md:grid-cols-3 lg:grid-cols-5 gap-6 w-full' : 'md:grid-cols-4 lg:grid-cols-4 gap-6'}  max-w-full`}
          >
            {!isLoading || (!isError && filteredMovies?.length) ? (
              filteredMovies?.map((movie) => (
                <AnimatedMovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <LoadingSpinner />
            )}
          </div>
          {filteredMovies?.length ? <MoviePagination /> : null}
        </div>
      </div>
    </>
  )
}
