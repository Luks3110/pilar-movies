import { SearchType, TimeWindow } from './filter'

export type MovieSearchParams = {
  search: string
  searchType?: SearchType
  timeWindow?: TimeWindow
  page?: number
}

export interface MovieSearchResponse {
  backdrop_path: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  adult: boolean
  title: string
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
