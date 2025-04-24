import { cookies } from "next/headers";
import { decrypt } from "./sessions";
import { AuthUser } from "@/types";

export default async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  const user = await decrypt(session);

  if (!user) return null;

  return user as AuthUser; // type assertion if needed
}
