"use client";
import { useState } from "react";
import { Review } from "@/types";

const ReviewCard = ({ movieId }: { movieId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/movie/reviews?movieId=${movieId}`);
      const data = await res.json();
      setReviews(data.results || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8">
      <div className="w-full">
        <button
          onClick={loadReviews}
          disabled={loading}
          className="block px-4 py-2 w-48 bg-slate-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-slate-700"
        >
          Load Reviews
        </button>
      </div>

      <div className="mt-4 space-y-6 max-h-[600px] overflow-y-auto pb-4 ">
        {reviews.length > 0
          ? reviews.map((review) => (
              <article
                key={review.id}
                className="border-b pb-6 overflow-scroll h-screen w-48"
              >
                <header className="flex justify-between mb-2  bg-purple-500  rounded-xs">
                  <h3 className="font-medium text-white ">{review.author}</h3>

                  <time className="text-sm text-white pr-3 ">
                    {new Date(review.created_at).toLocaleDateString()}
                  </time>
                </header>
                <p className="text-gray-700 whitespace-pre-line text-justify text-xs">
                  {review.content}
                </p>
              </article>
            ))
          : hasSearched &&
            !loading && (
              <div className="mx-auto my-4">
                <p className="text-yellow-500">No reviews yet</p>
              </div>
            )}
      </div>
    </section>
  );
};

export default ReviewCard;
