import { getMovieDetails } from "@/services/api/movieDetails";
import { queryOptions } from "@tanstack/react-query";

export const movieOptions = ({ movieId }: { movieId: number }) =>
  queryOptions({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
  });
