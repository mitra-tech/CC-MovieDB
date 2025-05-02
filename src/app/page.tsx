import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { Movie } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

async function getMovies(page: number, query?: string) {
  const basePath = query ? "/api/movies/search" : "/api/movies";
  const url = new URL(
    `${basePath}?page=${page}${
      query ? `&query=${encodeURIComponent(query)}` : ""
    }`,
    process.env.NEXT_PUBLIC_SITE_URL
  );

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  } catch (error) {
    console.error(error);
    return { results: [], total_pages: 1 };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const query = params?.query || "";

  const { results: movies, total_pages: totalPages } = await getMovies(
    page,
    query
  );

  return (
    <div className="min-h-screen bg-slate-300 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <div className="mb-8">
          <form action="/" method="GET" className="relative w-full max-w-full">
            <input
              type="text"
              name="query"
              placeholder="Search movies..."
              defaultValue={query}
              className="w-full px-4 py-2 rounded-lg border border-slate-500 focus:outline-none focus:ring-2 focus:border-slate-700"
            />
            <button
              type="submit"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
            </button>
            {/* Include current page in form to avoid resetting to page 1 */}
            <input type="hidden" name="page" value={page} />
          </form>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            query={query}
          />
        )}

        {query && (
          <div className="mb-4 text-slate-700">
            {movies.length > 0
              ? `Found ${movies.length} results for "${query}"`
              : `No results found for "${query}"`}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            query={query}
          />
        )}
      </div>
    </div>
  );
}
