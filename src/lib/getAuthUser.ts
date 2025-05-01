import { cookies } from "next/headers";
import { decrypt } from "./sessions";
import { AuthUser } from "@/types";

export async function getAuthMethod() {
  const cookieStore = await cookies()
  const authMethod = cookieStore.get('auth-method')
    ? cookieStore.get('auth-method')?.value
    : null
  return authMethod
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  const user = await decrypt(session);
  if (!user) return null;
  return user as AuthUser; 
}

export async function getTmdbAuthUser() {
  const cookieStore = await cookies()
  const userData = cookieStore.get('user-account-data')
    ? JSON.parse(cookieStore.get('user-account-data')?.value)
    : null
  return userData
}

export async function getTmdbSessionId() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('tmdb-sessionid')
    ? cookieStore.get('tmdb-sessionid')?.value
    : null
  return sessionId
}