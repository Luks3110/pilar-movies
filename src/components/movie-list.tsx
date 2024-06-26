'use client'

import { useEffect, useMemo } from 'react'

import useSearch from '@/hooks/queries/useSearch'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { timeWindowsOptions } from '@/lib/constants/timeWindowsOptions'
import { TimeWindow } from '@/lib/types/filter'
import MovieSearchbar from './movie-searchbar'
import AnimatedMovieCard from './movies/animated-movie-card'
import SearchSwitch from './movies/search-switch'
import { useToast } from './ui/use-toast'

export function MovieList() {
  const { search, searchType, timeWindow, setSearchType, setTimeWindow } =
    useFilterStore()

  const handleTimeWindow = (newTimeWindow: TimeWindow) => {
    setTimeWindow(newTimeWindow)
  }

  const {
    data: movies,
    isLoading,
    isError,
  } = useSearch({
    search,
    searchType,
    timeWindow,
  })

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
    () => ['trending', 'normal'].includes(searchType),
    [searchType],
  )

  return (
    <>
      <header className="bg-background px-4 py-3 shadow-sm">
        <div className="container mx-auto flex items-center">
          <MovieSearchbar />
        </div>
      </header>
      <div
        className={`flex w-full gap-6 justify-between p-6 ${
          !['trending'].includes(searchType)
            ? 'md:grid-cols-1'
            : 'md:grid-cols-4'
        }`}
      >
        <SearchSwitch
          searchType={searchType}
          timeWindow={timeWindow}
          handleTimeWindow={handleTimeWindow}
          timeWindowsOptions={timeWindowsOptions}
        />
        <div
          className={` md:col-span-4 lg:col-span-6 grid md:grid-cols-3 lg:grid-cols-6 ${!normalOrTrending ? 'md:grid-cols-3 lg:grid-cols-5 gap-6 w-full' : 'md:grid-cols-4 lg:grid-cols-4 gap-6'}  max-w-full`}
        >
          {!isLoading || (!isError && filteredMovies?.length) ? (
            filteredMovies?.map((movie) => (
              <AnimatedMovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="fixed inset-0 flex items-center justify-center">
              <div
                className="inline-block h-96 w-96 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
