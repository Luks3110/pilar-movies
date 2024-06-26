import { useQuery } from "@tanstack/react-query";
import { MovieSearchParams } from "@/lib/types/search";
import {
  getMovies,
  getPopularMovies,
  getTrendingMovies,
} from "@/services/api/search";

const useSearch = ({
  search,
  searchType = "normal",
  timeWindow,
}: MovieSearchParams) => {
  switch (searchType) {
    case "normal":
      return useQuery({
        queryKey: ["normalSearch", { search, searchType, timeWindow }],
        queryFn: () => getMovies({ search }),
      });
    case "trending":
      return useQuery({
        queryKey: ["trendingSearch", { search, searchType, timeWindow }],
        queryFn: async () => getTrendingMovies({ search, timeWindow }),
      });
    case "popular":
      return useQuery({
        queryKey: ["popularSearch", { search, searchType, timeWindow }],
        queryFn: async () => getPopularMovies({ search }),
      });
  }
};

export default useSearch;
