"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ActionState } from "@/types";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function addToWatchlist(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState | null> {
  const jsonMovie = formData.get("movieDetails");
  if (!jsonMovie) {
    return { error: "MISSING_MOVIE_DETAILS" };
  }

  const movieData = JSON.parse(jsonMovie.toString());

  const user = await getAuthUser();
  if (!user) return redirect("/");

  const newMovieId = movieData.id;
  const watchlistCollection = await getCollection("watchlist");

  const isNewMovieExisted = await watchlistCollection?.findOne({
    movieId: newMovieId,
    userId: ObjectId.createFromHexString(user.userId as string),
  });

  if (isNewMovieExisted) {
    return { error: "MOVIE_ALREADY_IN_WATCHLIST" };
  }

  // Save the new post in DB
  try {
    const watchlistCollection = await getCollection("watchlist");
    const movie = {
      movieId: movieData.id,
      title: movieData.title,
      userId: ObjectId.createFromHexString(user.userId as string),
      posterPath: movieData.poster_path,
      releaseDate: movieData.release_date,
      voteAverage: movieData.vote_average,
    };
    await watchlistCollection?.insertOne(movie);
  } catch (error) {
    return null;
  }

  // Redirect
  redirect("/dashboard");
}
