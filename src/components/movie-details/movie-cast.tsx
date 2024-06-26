import { IMAGE_BASE_URL, TMDB_URL } from '@/lib/constants/tmdb'
import { MovieDetail } from '@/lib/types/movieDetails'
import Link from 'next/link'
import ImageFallback from '../ui/image-fallback'

const MovieCast = ({ cast }: { cast: MovieDetail['credits']['cast'] }) => (
  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 p-2 w-full h-full">
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
            className="lg:max-w-[15rem] lg:max-h-[15rem] h-full"
          >
            <div className="block border border-transparent rounded-md overflow-hidden min-h-[159px]">
              {member.profile_path ? (
                <ImageFallback
                  alt={`${member.name}`}
                  src={`${IMAGE_BASE_URL}${member.profile_path}`}
                  width={300}
                  height={120}
                  loading="lazy"
                  className="border rounded-md rounded-b-none border-transparent min-h-[159px] md:w-[82px] md:h-[123px] lg:w-[640px] lg:h-[342px] object-cover"
                />
              ) : (
                <ImageFallback
                  alt={`${member.name}`}
                  src={`/fallback.png`}
                  loading="lazy"
                  width={720}
                  height={640}
                  className="border rounded-md rounded-b-none border-transparent min-h-[159px] md:w-[82px] md:h-[123px] lg:w-[640px] lg:h-[342px] object-cover"
                />
              )}
            </div>
            <div className="w-full px-[2px]">
              <div className="bg-white w-full rounded-b-md p-2 min-h-[8.5rem] sm:min-h-[2rem]">
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
)

export default MovieCast
