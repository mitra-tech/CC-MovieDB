"use client";

import { useState } from "react";
import ApproveTokenButton from "./ApproveTokenButton";

export default function CreateToken({
  createToken,
}: {
  createToken: () => Promise<any>;
}) {
  const [token, setToken] = useState("");
  const [tokenStatus, setTokenStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateToken = async () => {
    setIsLoading(true);
    try {
      const result = await createToken();
      if (result?.success) {
        setToken(result.data.data);
        setTokenStatus(true);
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
    <div className="flex flex-col gap-4 w-full max-w-md">
      <button
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          tokenStatus
            ? "bg-gray-400 cursor-not-allowed"
            : isLoading
            ? "bg-slate-500"
            : "bg-slate-500 hover:bg-slate-700"
        } text-white shadow-md`}
        onClick={handleCreateToken}
        disabled={tokenStatus || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full" />
            Creating...
          </span>
        ) : tokenStatus ? (
          "Token Created ✓"
        ) : (
          "Create Token"
        )}
      </button>

      {tokenStatus && <ApproveTokenButton token={token} />}
    </div>
  );
}
