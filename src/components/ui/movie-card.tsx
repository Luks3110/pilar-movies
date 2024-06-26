import Link from "next/link";
import React from "react";

const MovieCard = ({
  photoLink,
  title,
  description,
}: {
  photoLink: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="transition-transform duration-300 ease-in-out hover:scale-105 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]">
      <div className="flex flex-col items-center justify-center border border-transparent rounded-md">
        <div>
          <Link href={photoLink} prefetch={false}>
            <img
              alt={title}
              src={photoLink}
              width={300}
              height={120}
              loading="lazy"
              className="border rounded-md rounded-b-none"
            />
          </Link>
        </div>
        <div className="bg-white w-full h-full rounded-b-md p-2 min-h-28">
          <div>
            <h4 className="text-black font-extrabold">{title}</h4>
          </div>
          <div>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
