import {
  MovieSearchParams,
  MovieSearchResponse,
  SearchResponse,
} from '@/lib/types/search'

import httpClient from '../client/httpClient'

const getMovies = async ({ search, page }: MovieSearchParams) => {
  return httpClient.get<SearchResponse<MovieSearchResponse>>(
    `/search/movie?query=${search}&language=pt-BR${page ? `&page=${page}` : ''}`,
  )
}

const getTrendingMovies = async ({ timeWindow, page }: MovieSearchParams) => {
  return httpClient.get<SearchResponse<MovieSearchResponse>>(
    `/trending/movie/${timeWindow}${page ? `?page=${page}` : ''}`,
  )
}

const getPopularMovies = async ({ search, page }: MovieSearchParams) => {
  return httpClient.get<SearchResponse<MovieSearchResponse>>(
    `/movie/popular?query=${search}&language=pt-BR${page ? `&page=${page}` : ''}`,
  )
}

export { getMovies, getPopularMovies, getTrendingMovies }
