"use server";

export async function createToken() {
    const basePath = "/api/tmdb/account";
    const url = new URL(
      `${basePath}?type=token`,
      process.env.NEXT_PUBLIC_SITE_URL
    );
  
    try {
      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("Failed to fetch token");
      return { success: true, data: await res.json() };
    } catch (error) {
      console.error(error);
      return { results: [], total_pages: 1 };
    }
  }

  export async function createSession(token: string) {
    const basePath = "/api/tmdb/account";
    const url = new URL(
      `${basePath}?type=session&token=${token}`,
      process.env.NEXT_PUBLIC_SITE_URL
    );
  
    try {
      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("Failed to fetch token");
      return { success: true, data: await res.json() };
    } catch (error) {
      console.error(error);
      return { results: [], total_pages: 1 };
    }
  }

  export async function getAccount(sessionId: string) {
    const basePath = "/api/tmdb/account";
    const url = new URL(
      `${basePath}?type=account&sessionId=${sessionId}`,
      process.env.NEXT_PUBLIC_SITE_URL
    );
  
    try {
      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("Failed to fetch token");
      return { success: true, data: await res.json() };
    } catch (error) {
      console.error(error);
      return { results: [], total_pages: 1 };
    }
  }

