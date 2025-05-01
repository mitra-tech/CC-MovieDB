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
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
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
