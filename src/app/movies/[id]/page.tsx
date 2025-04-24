// import { addToWatchlist } from "@/actions/watchlist";
import { MovieCardDetails } from "@/components/MovieCardDetails";
import { MovieDetails } from "@/types";

async function getMovieDetails(id: string): Promise<MovieDetails> {
  const url = new URL(
    `/api/movie?movieId=${id}`,
    process.env.NEXT_PUBLIC_SITE_URL
  );

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(id);

    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <MovieCardDetails movie={movie} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 text-center text-red-500">
        Failed to load movie details. Please try again later.
      </div>
    );
  }
}
