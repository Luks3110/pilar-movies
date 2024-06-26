"use client";

import useMovieDetails from "@/hooks/queries/useMovieDetails";
import { useToast } from "./ui/use-toast";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import MovieBackdrop from "./movie-details/movie-backdrop";
import MovieCast from "./movie-details/movie-cast";
import MovieTitle from "./movie-details/movie-title";
import MoviePopularity from "./movie-details/movie-popularity";
import MoviePoster from "./movie-details/movie-poster";
import MovieYear from "./movie-details/movie-year";
import MovieAgeGroup from "./movie-details/movie-age-group";
import { IMAGE_BASE_URL } from "@/lib/constants/tmdb";

export default function MovieDetail({ movieId }: { movieId: number }) {
  const { movie, isLoading, isError } = useMovieDetails(Number(movieId));
  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Algo deu errado ao buscar os detalhes do moviee",
        description: "Por favor, tente novamente mais tarde",
        variant: "destructive",
      });

      router.replace("/");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="inline-block h-96 w-96 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const ageGroup = movie?.release_dates?.results?.find(
    (releaseDate) => releaseDate.iso_3166_1 === "BR"
  );

  const popularity = Number(movie?.vote_average.toFixed(1));

  const posterPath = `${IMAGE_BASE_URL}${movie?.poster_path}`;

  return movie ? (
    <section className="flex flex-col items-center bg-background rounded-md shadow-sm overflow group h-full sm:h-[100vh] w-full px-8 relative h-max-full">
      <MovieBackdrop
        src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
        alt={movie.title}
      />
      <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-50 z-10"></div>
      <div className="pt-16">
        <div className="w-full h-full flex flex-col sm:flex-row sm:justify-start items-center lg:flex gap-16">
          <MoviePoster src={posterPath} alt={movie.title} />
          <div className="z-20 pt-2 w-full h-fit">
            <div className="flex items-center gap-2">
              <MovieTitle title={movie.title} />
              <MovieYear date={movie.release_date} />
            </div>
            <div className="flex items-center gap-2">
              <MovieAgeGroup
                ageGroup={ageGroup?.release_dates[0].certification}
              />
              <div className="flex items-center">
                <span className="text-sm font-medium text-white">
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </span>
                <MoviePopularity popularity={popularity} />
              </div>
            </div>
            <div className="z-20 pt-2 flex flex-col items-start">
              <h2 className="text-[1.3rem] text-white font-bold">Sinopse</h2>
              <div className="flex items-center w-full sm:w-[75%]">
                <h4 className="text-[1rem] text-white">{movie.overview}</h4>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit mt-5 z-20">
              <h2 className="text-[1.3rem] text-white font-bold mb-5">
                Elenco
              </h2>
              <MovieCast cast={movie.credits.cast} />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
