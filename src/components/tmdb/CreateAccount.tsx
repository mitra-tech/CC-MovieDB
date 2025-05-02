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
          ? "bg-purple-500"
          : "bg-purple-600 hover:bg-purple-700"
      } text-white shadow-md w-full`}
      disabled={accountIdStatus || isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full" />
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
