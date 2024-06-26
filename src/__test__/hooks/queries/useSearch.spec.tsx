import { renderHook, waitFor } from "../..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useSearch from "@/hooks/queries/useSearch";
import { MovieSearchParams, MovieSearchResponse } from "@/lib/types/search";
import * as searchServices from "@/services/api/search";

describe("useSearch", () => {
  const movieSearchResponseMock: MovieSearchResponse = {
    id: 1,
    title: "Inception",
    backdrop_path: "backdrop_path",
    original_title: "original_title",
    overview: "overview",
    poster_path: "poster_path",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [1, 2, 3],
    popularity: 1,
    release_date: "2010-07-15",
    video: false,
    vote_average: 8.8,
    vote_count: 20000,
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  const getMoviesSpy = jest.spyOn(searchServices, "getMovies");
  const getTrendingMoviesSpy = jest.spyOn(searchServices, "getTrendingMovies");
  const getPopularMoviesSpy = jest.spyOn(searchServices, "getPopularMovies");

  it("performs a normal search", async () => {
    const searchParams: MovieSearchParams = {
      search: "Inception",
      searchType: "normal",
    };

    getMoviesSpy.mockResolvedValue({
      data: {
        results: [movieSearchResponseMock],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    } as any);
    const { result } = renderHook(() => useSearch(searchParams), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.data.results).toEqual([
      movieSearchResponseMock,
    ]);
    expect(getMoviesSpy).toHaveBeenCalledWith({ search: "Inception" });
  });

  it("performs a trending search", async () => {
    const searchParams: MovieSearchParams = {
      search: "Inception",
      searchType: "trending",
      timeWindow: "week",
    };
    getTrendingMoviesSpy.mockResolvedValue({
      data: { results: [movieSearchResponseMock] },
    } as any);
    const { result } = renderHook(() => useSearch(searchParams), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(getTrendingMoviesSpy).toHaveBeenCalledWith({
      search: "Inception",
      timeWindow: "week",
    });
  });

  it("performs a popular search", async () => {
    const searchParams: MovieSearchParams = {
      search: "Inception",
      searchType: "popular",
    };
    getPopularMoviesSpy.mockResolvedValue({
      data: { results: [movieSearchResponseMock] },
    } as any);
    const { result } = renderHook(() => useSearch(searchParams), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(getPopularMoviesSpy).toHaveBeenCalledWith({ search: "Inception" });
  });
});
