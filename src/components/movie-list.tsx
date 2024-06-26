"use client";

import React, { useMemo, useEffect } from "react";

import Link from "next/link";
import useFilterStore from "@/hooks/stores/filter-store";
import useSearch from "@/hooks/queries/useSearch";
import { TimeWindow } from "@/lib/types/filter";
import Image from "next/image";
import MovieSearchbar from "./movie-searchbar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { CardContainer } from "./ui/card-container";
import { CardBody } from "./ui/card-body";
import { CardItem } from "./ui/card-item";
import { Skeleton } from "./ui/skeleton";
import { StarIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { timeWindowsOptions } from "@/lib/constants/timeWindowsOptions";
import SearchSwitch from "./movies/search-switch";
import AnimatedMovieCard from "./movies/animated-movie-card";

export function MovieList() {
  const { search, searchType, timeWindow, setSearchType, setTimeWindow } =
    useFilterStore();

  const handleTimeWindow = (newTimeWindow: TimeWindow) => {
    setTimeWindow(newTimeWindow);
  };

  const {
    data: movies,
    isLoading,
    isError,
  } = useSearch({
    search,
    searchType,
    timeWindow,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        description: "Erro ao carregar os filmes, tente novamente mais tarde",
        type: "background",
        duration: 3000,
        title: "Algo deu errado",
      });
    }
  }, [isError]);

  const filteredMovies = useMemo(
    () => movies?.data?.results.filter((movie) => !!movie.poster_path),
    [movies, movies?.data]
  );

  const normalOrTrending = useMemo(
    () => ["trending", "normal"].includes(searchType),
    [searchType]
  );

  return (
    <>
      <header className="bg-background px-4 py-3 shadow-sm">
        <div className="container mx-auto flex items-center">
          <MovieSearchbar />
        </div>
      </header>
      <div
        className={`flex w-full gap-6 justify-between p-6 ${
          !["trending"].includes(searchType)
            ? "md:grid-cols-1"
            : "md:grid-cols-4"
        }`}
      >
        <SearchSwitch
          searchType={searchType}
          timeWindow={timeWindow}
          handleTimeWindow={handleTimeWindow}
          timeWindowsOptions={timeWindowsOptions}
        />
        <div
          className={` md:col-span-4 lg:col-span-6 grid md:grid-cols-3 lg:grid-cols-6 ${!normalOrTrending ? "md:grid-cols-3 lg:grid-cols-5 gap-6 w-full" : "md:grid-cols-4 lg:grid-cols-4 gap-6"}  max-w-full`}
        >
          {!isLoading || (!isError && filteredMovies?.length) ? (
            filteredMovies?.map((movie) => (
              <AnimatedMovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div
              className="flex flex-col space-y-3 w-full h-full items-center justify-center"
              data-testid="loading-movie-skeleton"
            >
              <div className="w-full">
                <Skeleton className="h-[125px] w-[45vw] rounded-xl" />
              </div>
              <div className="space-y-2 w-full">
                <div className="w-full">
                  <Skeleton className="h-4 w-[250px]" />
                </div>
                <div className="w-full">
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
