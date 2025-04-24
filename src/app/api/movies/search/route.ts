import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query");

  if (!API_KEY) {
    return Response.json({ error: "API key missing" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching movies for the search ${query}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
