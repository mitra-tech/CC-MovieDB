"use client";

import { useSearchParams } from "next/navigation";
import CreateSession from "@/components/tmdb/CreateSession";
import { createSession } from "@/actions/account";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const approvedToken = searchParams.get("request_token");

  const handleCreateSession = async () => {
    if (!approvedToken) {
      throw new Error("Missing request_token");
    }
    return createSession(approvedToken);
  };

  return (
    <div className="container w-1/2">
      <h1 className="title">Authenticate With TMDB</h1>
      <CreateSession createSession={handleCreateSession} />
    </div>
  );
}
