import { MovieDetail } from "@/lib/types/movieDetails";
import httpClient from "../client/httpClient";

export const getMovieDetails = async (id: number) =>
  httpClient.get<MovieDetail>(
    `/movie/${id}?append_to_response=credits,release_dates,releases&language=pt-BR`
  );
