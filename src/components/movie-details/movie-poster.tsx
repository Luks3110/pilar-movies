import Image from "next/image";
import React from "react";

const MoviePoster = ({
  src,
  alt,
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <div className="rounded-lg z-20 w-full h-full sm:w-auto lg:h-[35rem] lg:w-[20rem] px-2 sm:px-24 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden relative shadow-slate-950">
      <Image
        src={src as string}
        alt={alt as string}
        className="w-full h-auto sm:absolute rounded-lg outline-none focus:outline-none border-none"
        width={500}
        height={300}
        loading="lazy"
      />
    </div>
  );
};

export default MoviePoster;
