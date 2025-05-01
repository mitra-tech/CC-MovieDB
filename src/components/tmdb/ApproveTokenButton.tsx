"use client";

import Link from "next/link";
import { useState } from "react";

export default function ApproveTokenButton({ token }: { token: string }) {
  const redirectLink = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/tmdb/callback`;
  const [isApproved, setIsApproved] = useState(false);

  const handleClick = () => {
    setIsApproved(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Link href={redirectLink} target="_blank" rel="noopener noreferrer">
        <button
          onClick={handleClick}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isApproved
              ? "bg-slate-500 cursor-not-allowed"
              : "bg-slate-500 hover:bg-slate-700"
          } text-white shadow-md w-full`}
          disabled={isApproved}
        >
          {isApproved ? "Approved ✓" : "Approve Token"}
        </button>
      </Link>
    </div>
  );
}
