import { getAuthMethod, getAuthUser, getTmdbAuthUser } from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { regAuthLogout, tmdbLogout } from "@/actions/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { AuthUser } from "@/types";
import AuthMethodDropdown from "./AuthMethodDropdown";

export default async function Navigation() {
  const authMethod = await getAuthMethod()
  let user;
  if (authMethod === 'tmdb') {
    user = await getTmdbAuthUser()
  } else {
    const authUser = (await getAuthUser()) as AuthUser;
    if (authUser) {
      const userId = authUser?.userId;
      const userCollection = await getCollection("users");
      if (userId?.length === 24 && userCollection) {
        user = await userCollection?.findOne({
          _id: ObjectId.createFromHexString(userId),
        });
      }
    }
  }

  return (
    <nav>
      {user && (
        <div className="hidden md:flex flex-col items-end">
          <p className="text-xs text-gray-300">Welcome</p>
          <h2 className="text-sm font-medium text-white truncate max-w-[160px]">
            {authMethod === 'tmdb' ? user.username : user?.email}
          </h2>
        </div>
      )}
      <NavLink label="Home" href="/" />
      {user ? (
        <>
          <NavLink label="Dashboard" href="/dashboard" />
          <div className="flex items-center">
            <form action={authMethod === 'tmdb' ? tmdbLogout : regAuthLogout}>
              <button className="nav-link">Logout</button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <AuthMethodDropdown />
        </div>
      )}
    </nav>
  );
}
