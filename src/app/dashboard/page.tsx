import MovieCard from "@/components/MovieCard";
import { getCollection } from "@/lib/db";
import { getAuthMethod, getAuthUser } from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { AuthUser, Movie, UserSavedMovie } from "@/types";
import { getTmdbUserWatchlist } from "@/actions/watchlist";

type WatchListMovie = Movie | UserSavedMovie;

export default async function UserDashboard() {
  const authMethod = await getAuthMethod();
  let userWatchList: WatchListMovie[] = [];

  if (authMethod === "tmdb") {
    const data = await getTmdbUserWatchlist();
    userWatchList = data?.results ?? [];
  } else {
    const authUser = (await getAuthUser()) as AuthUser;
    const watchlistCollection = await getCollection("watchlist");
    const userObjectId = new ObjectId(authUser.userId);
    userWatchList = (await watchlistCollection
      ?.find({ userId: userObjectId })
      .toArray()) as UserSavedMovie[];
  }

  return (
    <div className="container">
      <h1 className="title">Your Watch List</h1>

      {userWatchList?.length ? (
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="grid grid-cols-2 gap-4 mt-4">
            {userWatchList.map((movie) => {
              const isTmdbMovie = "id" in movie;

              return (
                <MovieCard
                  key={isTmdbMovie ? movie.id : movie._id.toString()}
                  movie={{
                    id: isTmdbMovie ? movie.id : movie.movieId,
                    title: movie.title,
                    poster_path: isTmdbMovie
                      ? movie.poster_path
                      : movie.posterPath,
                    release_date: isTmdbMovie
                      ? movie.release_date
                      : movie.releaseDate,
                    vote_average: isTmdbMovie
                      ? movie.vote_average
                      : movie.voteAverage,
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p className="mt-4">Your watchlist is empty.</p>
      )}
    </div>
  );
}
