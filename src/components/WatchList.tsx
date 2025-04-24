"use client";

import { useActionState } from "react";
import { addToWatchlist } from "@/actions/watchlist";
import { toast } from "sonner";
import { useEffect } from "react";

export function AddToWatchlist({ movieDetails }: { movieDetails: any }) {
  const [state, action, isPending] = useActionState(addToWatchlist, null);
  const jsonMovie = JSON.stringify(movieDetails);

  useEffect(() => {
    if (state?.error === "MOVIE_ALREADY_IN_WATCHLIST") {
      toast.error("This movie is already in your watchlist!");
    }
  }, [state]);

  return (
    <div>
      <form action={action}>
        <input type="hidden" name="movieDetails" value={jsonMovie} />
        <button
          type="submit"
          disabled={isPending}
          className="bg-slate-500 px-4 py-2 w-48 text-white  rounded  hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Adding..." : "+ Watchlist"}
        </button>
      </form>
    </div>
  );
}
