import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;

async function createToken() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    );
    const data = await res.json();
    if (data?.success) {
      return data.request_token;
    }
    return null;
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }
}

async function createSessionId(requestToken: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request_token: requestToken }),
      }
    );
    const data = await response.json();
    return data.session_id;
  } catch (error) {
    console.error("Error fetching session id:", error);
    return NextResponse.json(
      { error: "Failed to fetch session id" },
      { status: 500 }
    );
  }
}

async function getAccount(sessionId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching account id:", error);
    return NextResponse.json(
      { error: "Failed to fetch account id" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (type === "token") {
    const token = await createToken();
    if (!token) {
      return NextResponse.json(
        { error: "Creating token failed!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: token });
  }

  if (type === "session") {
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const sessionId = await createSessionId(token);
    if (!sessionId) {
      return NextResponse.json(
        { error: "Creating session id failed!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: sessionId });
  }

  if (type === "account") {
    const sessionId = searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const account = await getAccount(sessionId);
    if (!account) {
      return NextResponse.json(
        { error: "Getting account id failed!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: account });
  }

  return NextResponse.json(
    { error: "Invalid type parameter" },
    { status: 400 }
  );
}
