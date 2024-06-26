import { getMovieDetails } from "@/services/api/movieDetails";
import { useQuery } from "@tanstack/react-query";

const useMovieDetails = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });

  return { movie: data?.data, isLoading, isError };
};

export default useMovieDetails;
