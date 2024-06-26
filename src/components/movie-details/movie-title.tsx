import React from "react";

const MovieTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="text-[1.3rem] sm:text-[2rem] text-white font-extrabold truncate hover:text-zinc-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
      {title}
    </h2>
  );
};

export default MovieTitle;
