import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  const sessionToken = uuidv4();
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  const queryUrl = `${BASE_URL}?q=${searchText}?language=en&limit=6&session_token=${sessionToken}&access_token=${token}&country=CA`;
  const res = await fetch(queryUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const searchResult = await res.json();
  return NextResponse.json({ searchResult });
}
