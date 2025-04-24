import Image from "next/image";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movies/${movie.id}`} className="block">
      <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
            placeholder="blur"
            blurDataURL="/placeholder-movie.jpg"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
            {movie.title}
          </h2>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm font-semibold text-gray-700">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
