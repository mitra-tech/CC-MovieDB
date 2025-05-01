"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAccount({
  createAccount,
}: {
  createAccount: () => Promise<any>;
}) {
  const [accountIdStatus, setAccountIdStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      const result = await createAccount();
      if (result?.success) {
        setAccountIdStatus(true);
        setCookie(
          "user-account-data",
          JSON.stringify({
            id: result.data.data.id,
            username: result.data.data.username,
          })
        );
        router.push("/");
        router.refresh();
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateAccount}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        accountIdStatus
          ? "bg-gray-400 cursor-not-allowed"
          : isLoading
          ? "bg-slate-500"
          : "bg-slate-500 hover:bg-slate-700"
      } text-white shadow-md w-full`}
      disabled={accountIdStatus || isLoading}
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
      ) : accountIdStatus ? (
        "Account Created ✓"
      ) : (
        "Create Account"
      )}
    </button>
  );
}
