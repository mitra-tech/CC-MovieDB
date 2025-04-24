import { Movie } from "@/types";
import { AddToWatchlist } from "./WatchList";
import ReviewCard from "./ReviewCard";
import {
  StarIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const MovieCardDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
      <div className="w-full md:w-1/3 lg:w-1/4">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-md w-full h-auto   object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="bg-gray-100 rounded-lg aspect-[2/3] flex items-center justify-center">
            <span className="text-gray-400">No poster available</span>
          </div>
        )}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-4">
            <AddToWatchlist movieDetails={movie} />
          </div>
          <div id="reviews-section" className="mt-8 ">
            <ReviewCard movieId={movie.id.toString()} />
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
              <div className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full">
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <span className="font- text-slate-800">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full">
              <ClockIcon className="w-4 h-4 text-purple-500" />
              <span className="text-slate-800">
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "00h 00m"}
              </span>
            </div>

            {movie.release_date && (
              <div className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full">
                <CalendarIcon className="w-4 h-4 text-purple-500" />
                <span className="text-slate-800">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Overview */}
        {movie.overview && (
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-2.5">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">{movie.overview}</p>
          </div>
        )}

        {/* Cast Section */}
        {movie.credits?.cast && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
              Top Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movie.credits.cast.slice(0, 10).map((actor) => (
                <div
                  key={actor.id || actor.name}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 rounded-full overflow-hidden shadow-md">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="text-center w-full min-w-0 px-1">
                    <p
                      className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors w-full"
                      title={actor.name}
                    >
                      {actor.name}
                    </p>
                    <p
                      className="text-xs md:text-sm text-gray-500 w-full"
                      title={actor.character}
                    >
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
