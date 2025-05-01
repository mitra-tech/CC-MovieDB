import { createToken } from "@/actions/account";
import CreateToken from "@/components/tmdb/CreateToken";

export default function Register() {
  return (
    <div className="container w-1/2">
      <h1 className="title">Authenticate With TMDB</h1>
      <CreateToken createToken={createToken} />
    </div>
  );
}