import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const API_KEY = process.env.API_KEY;
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get('movieId');
    if (!movieId) {
      return NextResponse.json(
        { error: 'Movie ID is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return Response.json({ error: "API key missing" }, { status: 500 });
    }

    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
      const data = await res.json();
      return NextResponse.json(data);
  } catch (error) {
      console.error('Error fetching movies:', error);
      return NextResponse.json(
        { error: 'Failed to fetch movies' },
        { status: 500 }
      );
  }   
}