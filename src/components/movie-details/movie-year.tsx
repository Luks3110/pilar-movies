import { isValidDate } from "@/lib/isValidDate";
import React from "react";

const MovieYear = ({ date }: { date: string }) => {
  const formattedDate = isValidDate(date)
    ? `(${new Date(date).getFullYear()})`
    : null;

  if (!formattedDate) {
    return null;
  }

  return (
    <div
      data-testid="movie-year"
      className="flex items-center gap-2 text-[1.3rem] sm:text-[2rem]"
    >
      <span className="text-white">{formattedDate}</span>
    </div>
  );
};

export default MovieYear;
