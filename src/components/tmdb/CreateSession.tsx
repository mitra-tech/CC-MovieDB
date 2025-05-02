"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { getAccount } from "@/actions/account";
import CreateAccount from "./CreateAccount";

export default function CreateSession({
  createSession,
}: {
  createSession: () => Promise<any>;
}) {
  const [sessionId, setSessionId] = useState("");
  const [sessionIdStatus, setSessionIdStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSession = async () => {
    setIsLoading(true);
    try {
      const result = await createSession();
      if (result?.success) {
        setSessionId(result.data.data);
        setSessionIdStatus(true);
        setCookie("tmdb-sessionid", result.data.data);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    return getAccount(sessionId);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        onClick={handleCreateSession}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          sessionIdStatus
            ? "bg-gray-400 cursor-not-allowed"
            : isLoading
            ? "bg-slate-500"
            : "bg-slate-500 hover:bg-slate-700"
        } text-white shadow-md w-full`}
        disabled={sessionIdStatus || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full" />
            Creating...
          </span>
        ) : sessionIdStatus ? (
          "Session Created ✓"
        ) : (
          "Create Session"
        )}
      </button>
      {sessionIdStatus && <CreateAccount createAccount={handleCreateAccount} />}
    </div>
  );
}
