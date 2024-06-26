'use client'

import { useEffect, useMemo, useRef } from 'react'

import useSearch from '@/hooks/queries/useSearch'
import useFilterStore from '@/hooks/stores/useFilterStore'
import { timeWindowsOptions } from '@/lib/constants/timeWindowsOptions'
import { SearchType, TimeWindow } from '@/lib/types/filter'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MovieSearchbar from './movie-searchbar'
import AnimatedMovieCard from './movies/animated-movie-card'
import { MoviePagination } from './movies/movie-pagination'
import SearchSwitch from './movies/search-switch'
import { useToast } from './ui/use-toast'

type SearchParams = {
  search?: string
  searchType?: SearchType
  timeWindow?: TimeWindow
  page?: number
}

export function MovieList() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const {
    search,
    searchType,
    timeWindow,
    page,
    setSearch,
    setSearchType,
    setTimeWindow,
    setPage,
    setTotalPages,
  } = useFilterStore()

  useEffect(() => {
    const currentParams = Object.fromEntries(
      new URLSearchParams(window.location.search),
    )

    const updates: SearchParams = {}

    if (currentParams.search !== search) updates.search = search
    if (currentParams.searchType !== searchType) updates.searchType = searchType
    if (currentParams.timeWindow !== timeWindow) updates.timeWindow = timeWindow
    if (currentParams.page !== page.toString()) updates.page = page

    if (Object.keys(updates).length > 0) {
      const newParams = new URLSearchParams({
        ...currentParams,
        ...updates,
      } as Record<string, string>)
      router.push(`${pathname}?${newParams.toString()}`)
    }
  }, [search, searchType, timeWindow, page, router, pathname])

  useEffect(() => {
    const handleRouteChange = () => {
      const params = new URLSearchParams(window.location.search)
      const search = params.get('search')
      const searchType = params.get('searchType')
      const timeWindow = params.get('timeWindow')
      const page = params.get('page')

      if (search) setSearch(search)
      if (searchType) setSearchType(searchType as SearchType)
      if (timeWindow) setTimeWindow(timeWindow as TimeWindow)
      if (page) setPage(Number(page))
    }

    handleRouteChange()
  }, [pathname, searchParams])

  const handleTimeWindow = (newTimeWindow: TimeWindow) => {
    setTimeWindow(newTimeWindow)
  }

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

  const { toast } = useToast()

  const searchRef = useRef(search)

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

  useEffect(() => {
    if (movies?.data?.total_pages) {
      setTotalPages(movies.data.total_pages)
    }
  }, [movies])

  useEffect(() => {
    if (searchRef.current !== search) {
      setPage(1)
      searchRef.current = search
    }
  }, [search, setPage])

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
        <div>
          <div
            className={` md:col-span-4 lg:col-span-6 grid md:grid-cols-3 lg:grid-cols-5 ${!normalOrTrending ? 'md:grid-cols-3 lg:grid-cols-5 gap-6 w-full' : 'md:grid-cols-4 lg:grid-cols-4 gap-6'}  max-w-full`}
          >
            {!isLoading || (!isError && filteredMovies?.length) ? (
              filteredMovies?.map((movie) => (
                <AnimatedMovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div
                className="fixed inset-0 flex items-center justify-center"
                data-testid="loading-movie-spinner"
              >
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
          {filteredMovies?.length ? <MoviePagination /> : null}
        </div>
      </div>
    </>
  )
}
