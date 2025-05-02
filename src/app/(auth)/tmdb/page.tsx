import { createToken } from "@/actions/account";
import CreateToken from "@/components/tmdb/CreateToken";

export default function Register() {
  return (
    <div className="container w-1/2">
      <h1 className="title">Authenticate With TMDB</h1>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="h-2 w-2 block rounded-full bg-yellow-50"></span>
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You need a TMDB account before creating a token.{" "}
              <a
                href="https://www.themoviedb.org/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-500 underline font-medium"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
      <CreateToken createToken={createToken} />
    </div>
  );
}
