"use client";
import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { ActionState } from "@/types";

export default function Register() {
  const [state, action, isPending] = useActionState<ActionState, FormData>(
    register,
    { email: "", errors: {} }
  );
  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={state?.email} />
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          {state?.errors?.password && (
            <div className="error">
              <p>Password must:</p>
              <ul className="list-disc list-inside ml-4">
                {state.errors.password.map((err: string) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" />
          {state?.errors?.confirmPassword && (
            <p className="error">{state.errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex items-end gap-4">
          <button
            disabled={isPending}
            className="block px-4 py-2 w-48 bg-slate-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-slate-700"
          >
            {isPending ? "Loading..." : "Register"}
          </button>
          <Link href="/login" className="text-link pl-2 pb-2">
            or login here
          </Link>
        </div>
      </form>
    </div>
  );
}
