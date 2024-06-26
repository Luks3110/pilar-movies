import React from "react";

const MovieAgeGroup = ({ ageGroup }: { ageGroup?: string }) => {
  return (
    <div className="flex items-center border border-white rounded-md px-2 py-1 text-white">
      <span data-testid="age-group">{ageGroup || "L"}</span>
      <span data-testid="age-group-plus">{ageGroup ? "+" : ""}</span>
    </div>
  );
};

export default MovieAgeGroup;
