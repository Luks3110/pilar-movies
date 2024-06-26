import {
  MovieSearchParams,
  MovieSearchResponse,
  SearchResponse
} from "@/lib/types/search";

import httpClient from "../client/httpClient";

const getMovies = async ({ search }: MovieSearchParams) => {
  return httpClient.get<SearchResponse<MovieSearchResponse>>(
    `/search/movie?query=${search}&language=pt-BR`
  );
};

const getTrendingMovies = async ({ timeWindow }: MovieSearchParams) => {
  return httpClient.get<SearchResponse<MovieSearchResponse>>(
    `/trending/movie/${timeWindow}`
  );
};

const getPopularMovies = async ({ search }: MovieSearchParams) => {
  return httpClient.get<SearchResponse<MovieSearchResponse>>(
    `/movie/popular?query=${search}&language=pt-BR`
  );
};

export { getMovies, getTrendingMovies, getPopularMovies };
