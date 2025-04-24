import { test, expect } from "@playwright/test";

test.describe("Movie API", () => {
  const API_URL = "/api/movie";

  test("should return list of movies", async ({ request }) => {
    const response = await request.get(`${API_URL}?movieId=1363299`);
    expect(response.status()).toBe(200);
  });

  test("should return 400 for missing movieId", async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.status()).toBe(400);
  });
});

test.describe("Movies List API", () => {
  const API_URL = "/api/movies";

  test("should return movies with valid API key", async ({ request }) => {
    const response = await request.get(`${API_URL}?page=1`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("page");
    expect(data).toHaveProperty("results");
    expect(Array.isArray(data.results)).toBeTruthy();

    // Sample check for movie data structure
    if (data.results.length > 0) {
      const movie = data.results[0];
      expect(movie).toHaveProperty("id");
      expect(movie).toHaveProperty("title");
      expect(movie).toHaveProperty("release_date");
    }
  });

  test("should handle pagination correctly", async ({ request }) => {
    const response1 = await request.get(`${API_URL}?page=1`);
    const data1 = await response1.json();

    const response2 = await request.get(`${API_URL}?page=2`);
    const data2 = await response2.json();

    // Verify different pages return different results
    expect(data1.page).toBe(1);
    expect(data2.page).toBe(2);
    expect(data1.results[0].id).not.toBe(data2.results[0].id);
  });
});

test.describe("Movie Review API", () => {
  const API_URL = "/api/movie/reviews";

  test("should return list of movies", async ({ request }) => {
    const response = await request.get(`${API_URL}?movieId=1363299`);
    expect(response.status()).toBe(200);
  });

  test("should return 400 for missing movieId", async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.status()).toBe(400);
  });
});

test("API route should return movie search results", async ({ request }) => {
  const API_URL = "/api/movies/search";
  const query = "spiderman";
  const response = await request.get(`${API_URL}?query=${query}`);

  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("results");
  expect(data).toHaveProperty("page");
  expect(data).toHaveProperty("total_pages");

  expect(
    data.results.some((movie: any) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    )
  ).toBeTruthy();
});
