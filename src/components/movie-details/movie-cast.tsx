import { IMAGE_BASE_URL, TMDB_URL } from "@/lib/constants/tmdb";
import { MovieDetail } from "@/lib/types/movieDetails";
import Image from "next/image";
import Link from "next/link";

const MovieCast = ({ cast }: { cast: MovieDetail["credits"]["cast"] }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 p-2 w-full h-full">
    {cast.slice(0, 5).map((member, index) => (
      <div
        key={member.id || index}
        className="flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <div className="w-full h-full m-0 p-0">
          <Link
            data-testid={`cast-member-${member.id}`}
            href={`${TMDB_URL}person/${member.id}`}
            prefetch={false}
          >
            <div className="block border border-transparent rounded-md overflow-hidden">
              <Image
                alt={`${member.name}`}
                src={`${IMAGE_BASE_URL}${member.profile_path}`}
                width={300}
                height={120}
                loading="lazy"
                className="border rounded-md rounded-b-none border-transparent"
              />
            </div>
            <div className="w-full px-[2px]">
              <div className="bg-white w-full rounded-b-md p-2 min-h-[7rem] sm:min-h-[2rem]">
                <h4
                  className="text-black font-extrabold"
                  data-testid="cast-member-name"
                >
                  {member.original_name}
                </h4>
                <span data-testid="cast-member-character">
                  {member.character}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

export default MovieCast;
