"use client";
import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";
import { ActionState } from "@/types";

export default function Login() {
  // Default state to match ActionState structure
  const defaultState: ActionState = {
    errors: {},
    email: "",
  };

  const [state = defaultState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(login, defaultState);

  return (
    <div className="container w-1/2">
      <h1 className="title">Login</h1>

      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={state?.email} />
          {state?.errors?.email && (
            <p className="error">{state.errors.email.join(", ")}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          {state?.errors?.password && (
            <p className="error">{state.errors.password.join(", ")}</p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <button
            disabled={isPending}
            className="block px-4 py-2 w-48 bg-slate-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-slate-700"
          >
            {isPending ? "Loading..." : "Login"}
          </button>

          <Link href="/register" className="text-link text-slate-500 pl-2 pb-2">
            or register here
          </Link>
        </div>
      </form>
    </div>
  );
}
