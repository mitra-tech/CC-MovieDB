"use server";

import { getCollection } from "@/lib/db";
import { getAuthUser, getTmdbAuthUser, getTmdbSessionId } from "@/lib/getAuthUser";
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


export async function addToImdbWatchlist(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState | null> {
  const jsonMovie = formData.get("movieDetails");
  if (!jsonMovie) {
    return { error: "MISSING_MOVIE_DETAILS" };
  }

  const movieData = JSON.parse(jsonMovie.toString());

  const user = await getTmdbAuthUser();
  if (!user) return redirect("/");

  const accountId = user.id
  const API_KEY = process.env.API_KEY
  const sessionId = await getTmdbSessionId()

  const newMovieId = movieData.id;

  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: newMovieId,
      watchlist: true,
    }),
  };

  fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data); // { success: true, status_code: 1, status_message: "Success." }
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
  redirect("/dashboard");
}

export async function getTmdbUserWatchlist() {
  const API_KEY = process.env.API_KEY

  const user = await getTmdbAuthUser();
  if (!user) return redirect("/");

  const accountId = user.id
  const sessionId = await getTmdbSessionId()

  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

