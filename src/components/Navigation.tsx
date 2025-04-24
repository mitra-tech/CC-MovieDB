import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { AuthUser } from "@/types";

export default async function Navigation() {
  const authUser = (await getAuthUser()) as AuthUser;
  let user;
  if (authUser) {
    const userId = authUser?.userId;
    const userCollection = await getCollection("users");
    if (userId?.length === 24 && userCollection) {
      user = await userCollection?.findOne({
        _id: ObjectId.createFromHexString(userId),
      });
    }
  }

  return (
    <nav>
      {authUser && (
        <div className="hidden md:flex flex-col items-end">
          <p className="text-xs text-gray-300">Welcome back</p>
          <h2 className="text-sm font-medium text-white truncate max-w-[160px]">
            {user?.email}
          </h2>
        </div>
      )}
      <NavLink label="Home" href="/" />
      {authUser ? (
        <>
          <NavLink label="Dashboard" href="/dashboard" />
          <div className="flex items-center">
            <form action={logout}>
              <button className="nav-link">Logout</button>
            </form>
          </div>
        </>
      ) : (
        <div>
          <NavLink label="Register" href="/register" />
          <NavLink label="Login" href="/login" />
        </div>
      )}
    </nav>
  );
}
