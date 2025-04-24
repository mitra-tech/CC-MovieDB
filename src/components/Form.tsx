import { ActionState } from "@/types";
import { useActionState } from "react";
import { login } from "@/actions/auth";
import { register } from "@/actions/auth";
import Link from "next/link";

const AuthForm = ({ formType }: { formType: string }) => {
  const defaultState: ActionState = {
    errors: {},
    email: "",
  };
  const formAction = formType === "register" ? register : login;
  const formBtn = formType === "register" ? "Register" : "Login";

  const [state = defaultState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(formAction, defaultState);

  return (
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
      {formType === "register" && (
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" />
          {state?.errors?.confirmPassword && (
            <p className="error">{state.errors.confirmPassword}</p>
          )}
        </div>
      )}

      <div className="flex items-end gap-4">
        <button
          disabled={isPending}
          className="block px-4 py-2 w-48 bg-slate-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-slate-700"
        >
          {isPending ? "Loading..." : formBtn}
        </button>

        <Link
          href={formType === "register" ? "/register" : "/login"}
          className="text-link text-slate-500 pl-2 pb-2"
        >
          or {formType === "register" ? "login" : "register"} here
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
