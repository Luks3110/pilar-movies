const MoviePopularity = ({ popularity }: { popularity: number }) => {
  const getPopularityColor = (num: number) => {
    const level = num < 5 ? "low" : num >= 5 && num < 7 ? "medium" : "high";
    const popularityColors = {
      low: "text-red-800",
      medium: "text-yellow-800",
      high: "text-green-800",
    };
    return popularityColors[level];
  };

  return (
    <span
      className={`ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 ${getPopularityColor(popularity)}`}
    >
      {popularity}
    </span>
  );
};

export default MoviePopularity;
